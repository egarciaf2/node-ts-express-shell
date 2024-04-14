import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { UserModel } from "../../data";
import { bcryptAdapter, JwtAdapter } from "../../config";

export class AuthService {
    constructor() {
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

            //Email de confirmación

            const { password, ...rest } = UserEntity.fromObject( newUser );

            return {
                user:  rest,
                token: '123456xd'
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
            id: existUser._id,
            email: existUser.email,
        } );
        if ( !token ) throw CustomError.internalServerError( 'Error generating token' );

        return {
            user:  rest,
            token: token
        };

    }

    // validateEmail( obj: { [key: string]: any } ): [ string?, EmailDto? ] {
    //     const [error, emailDTO] = EmailDto.create( obj );
    //     if (error) return [ error ];
    //
    //     return [ undefined, emailDTO ];
    // }
}
