import { regularExps } from "../../../config";

export class LoginUserDto {
    private constructor(
        public readonly email: string,
        public readonly password: string,
    ) {
    }

    static create( obj: { [key: string]: any } ): [ string?, LoginUserDto? ] {
        const { email, password } = obj;

        if ( !email ) return [ 'Missing email' ];

        if ( !regularExps.email.test( email ) ) return [ 'Invalid email' ];
        if ( !password ) return [ 'Missing password' ];
        if ( !regularExps.password.test( password ) ) return [ 'Invalid password' ];

        return [ undefined, new LoginUserDto(
            email,
            password,
        ) ];
    }
}
