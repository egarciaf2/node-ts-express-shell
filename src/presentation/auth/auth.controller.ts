import { Request, Response } from 'express';
import { CustomError, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";

export class AuthController {

    constructor(
        public readonly _authService: AuthService,
    ) {
    }
    //
    // private handleError( res: Response, error: any ) {
    //
    //     if ( error instanceof CustomError ) {
    //         return res.status( error.statusCode ).json( error.message );
    //     }
    //     console.log( `${ error }` );
    //     res.status( 500 ).json( 'Internal server error' );
    // }

    registerUser = ( req: Request, res: Response ) => {
        const [ error, userDTO ] = RegisterUserDto.create( req.body );
        if ( error ) return res.status( 400 ).json( error );

        this._authService.registerUser( userDTO! )
            .then( user => res.json( user ) )
            .catch( err => CustomError.handleError( err, res ));
    }

    loginUser( req: Request, res: Response ) {
        res.json( 'loginUser' );
    }

    validateEmail( req: Request, res: Response ) {
        res.json( 'validateEmail' );
    }

}
