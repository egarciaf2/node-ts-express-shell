import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";

export class AuthMiddleware {

    static async validateJWT( req: Request, res: Response, next: NextFunction ) {
        const authorization = req.header( 'Authorization' );

        if ( !authorization ) return res.status( 401 ).json( { error: 'No token provided' } );
        if ( !authorization.startsWith( 'Bearer ' ) ) return res.status( 401 ).json( { error: 'Invalid Token 1' } );

        const token = authorization.split( ' ' )?.at( 1 ) || '';

        try {
            if ( !token ) return res.status( 401 ).json( { error: 'No token provided' } );

            const payload = await JwtAdapter.verifyToken<{ id: string }>( token );
            if ( !payload ) return res.status( 401 ).json( { error: 'Invalid Token' } );

            const user = await UserModel.findById( payload.id );
            if ( !user ) return res.status( 401 ).json( { error: 'Not authorized' } );

            const userEntity = UserEntity.fromObject( user );
            if ( userEntity.state != 'A' ) return res.status( 401 ).json( { error: 'Not authorized' } );

            req.body.user = userEntity;

            next();

        } catch ( error ) {
            return res.status( 500 ).json( { error: 'Internal server error' } );
        }
    }

}
