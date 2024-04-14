import jwt from 'jsonwebtoken';
import { envs } from "./envs";

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {

    static generateToken( payload: any, duration: string = '1h' ) {

        return new Promise( ( resolve ) => {
            jwt.sign( payload, JWT_SEED,
                { expiresIn: duration },
                ( err, token ) => {
                    if ( err ) return resolve( null );
                    resolve( token );
                } );

        } )

    }

    static verifyToken( token: string ): any {
        try {
            return jwt.verify( token, JWT_SEED );
        } catch ( error ) {
            return null;
        }
    }

}
