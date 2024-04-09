import { regularExps } from "../../../config";

export class RegisterUserDto {
    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) {
    }

    static create( obj: { [key: string]: any } ): [ string?, RegisterUserDto? ] {
        const { name, email, password } = obj;

        if ( !name ) return [ 'Missing name' ];
        if ( !email ) return [ 'Missing email' ];
        if ( !regularExps.email.test( email ) ) return [ 'Invalid email' ];
        if ( !password ) return [ 'Missing password' ];
        if ( !regularExps.password.test( password ) ) return [ 'Invalid password' ];

        return [ undefined, new RegisterUserDto(
            name,
            email,
            password,
        ) ];
    }
}
