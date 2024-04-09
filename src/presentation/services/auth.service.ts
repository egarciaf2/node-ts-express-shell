import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { UserModel } from "../../data";

export class AuthService {
    constructor() {
    }

    public async registerUser( userDto: RegisterUserDto ) {

        const existUser = await UserModel.findOne( { email: userDto.email } );
        if ( existUser ) throw CustomError.badRequest( 'User already exists' );

        try {
            const newUser = new UserModel( userDto );
            await newUser.save();

            //Encrypted password

            //JWT <- token authentication user

            //Email de confirmación

            const {password, ...userEntity} =  UserEntity.fromObject( newUser );

            return {
                user: userEntity,
                token: '123456xd'
            };

        } catch ( error ) {
            throw CustomError.internalServerError( `${ error }` );
        }
    }

    // loginUser( obj: { [key: string]: any } ): [ string?, LoginUserDto? ] {
    //     const [error, userDTO] = LoginUserDto.create( obj );
    //     if (error) return [ error ];
    //
    //     return [ undefined, userDTO ];
    // }
    //
    // validateEmail( obj: { [key: string]: any } ): [ string?, EmailDto? ] {
    //     const [error, emailDTO] = EmailDto.create( obj );
    //     if (error) return [ error ];
    //
    //     return [ undefined, emailDTO ];
    // }
}
