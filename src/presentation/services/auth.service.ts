import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { UserModel } from "../../data";
import { bcryptAdapter, envs, JwtAdapter } from "../../config";
import { EmailService, SendEmailOptions } from "./email.service";

export class AuthService {
    constructor(
        public readonly _emailService: EmailService,
    ) {
    }

    public async registerUser( userDto: RegisterUserDto ) {

        const existUser = await UserModel.findOne( { email: userDto.email } );
        if ( existUser ) throw CustomError.badRequest( 'User already exists' );

        try {
            const newUser = new UserModel( userDto );

            //Encrypted password
            newUser.password = bcryptAdapter.hash( userDto.password );

            await newUser.save();

            //JWT <- token authentication user
            const token = await JwtAdapter.generateToken( {
                id: newUser._id
            } );

            //Email de confirmación
            this.sendEmailValidationLink( newUser.email );

            const { password, ...rest } = UserEntity.fromObject( newUser );

            return {
                user:  rest,
                token: token
            };

        } catch ( error ) {
            throw CustomError.internalServerError( `${ error }` );
        }
    }

    async loginUser( loginDTO: LoginUserDto ) {

        const existUser = await UserModel.findOne( { email: loginDTO.email } );
        if ( !existUser ) throw CustomError.badRequest( 'Email or password invalid' );

        const passwordMatch = bcryptAdapter.compare( loginDTO.password, existUser.password );
        if ( !passwordMatch ) throw CustomError.badRequest( 'Email or password invalid' );

        const { password, ...rest } = UserEntity.fromObject( existUser );

        //Generate JWT
        const token = await JwtAdapter.generateToken( {
            id: existUser._id
        } );
        if ( !token ) throw CustomError.internalServerError( 'Error generating token' );

        return {
            user:  rest,
            token: token
        };

    }

    validateEmail = async ( token: string ) => {

        const payload = await JwtAdapter.verifyToken( token );
        if ( !payload ) throw CustomError.unauthorized( 'Invalid token' );

        const { email } = payload;
        if ( !email ) throw CustomError.internalServerError( 'Email not in token' );

        const user = await UserModel.findOne( { email } );
        if ( !user ) throw CustomError.notFound( 'Email not found' );

        user.emailValidated = true;
        await user.save();

        return true;
    }

    private sendEmailValidationLink = async ( email: string ) => {
        const token = await JwtAdapter.generateToken( { email }, '1d' );
        if ( !token ) throw CustomError.internalServerError( 'Error generating token' );

        const link = `${ envs.WEB_SERVER_URL }/auth/validate-email/${ token }`;
        const html = `
            <h1>Validate your email</h1>
            <p>Click the following link to validate your email:</p>
            <a href="${ link }">Click here to validate your email: ${ email }</a>
        `;

        const emailOptions: SendEmailOptions = {
            to:        email,
            subject:   'Validate your email',
            htmlBody:  html,
            fromEmail: "",
            fromName: "",
        };

        const isSendt = await this._emailService.sendEmail( emailOptions );
        if ( !isSendt ) throw CustomError.internalServerError( 'Error sending email' );

        return true;
    };

}
