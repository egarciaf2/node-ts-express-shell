import { Request, Response } from 'express';
import { CustomError, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthController {

    constructor(
        public readonly _authService: AuthService,
    ) {
    }

    registerUser = ( req: Request, res: Response ) => {
        const [ error, userDTO ] = RegisterUserDto.create( req.body );
        if ( error ) return res.status( 400 ).json( error );

        this._authService.registerUser( userDTO! )
            .then( user => res.json( user ) )
            .catch( err => CustomError.handleError( err, res ) );
    }

    loginUser = ( req: Request, res: Response ) => {
        const [ error, userDTO ] = LoginUserDto.create( req.body );
        if ( error ) return res.status( 400 ).json( error );

        this._authService.loginUser( userDTO! )
            .then( user => res.json( user ) )
            .catch( err => CustomError.handleError( err, res ) );
    }

    validateEmail( req: Request, res: Response ) {
        res.json( 'validateEmail' );
    }

}
