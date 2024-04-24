import { Request, Response } from 'express';
import { CustomError, RegisterUserDto } from "../../domain";
import { AuthService } from "../services";
import { LoginUserDto } from "../../domain";

export class AuthController {

    constructor(
        public readonly _authService: AuthService,
    ) {
    }

    /**
     * Registers a user.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
    registerUser = ( req: Request, res: Response ) => {
        const [ error, userDTO ] = RegisterUserDto.create( req.body );
        if ( error ) return res.status( 400 ).json( error );

        this._authService.registerUser( userDTO! )
            .then( user => res.json( user ) )
            .catch( err => CustomError.handleError( err, res ) );
    }

    /**
     * Login a user.
     * @param {Request} req - The request object containing the user information.
     * @param {Response} res - The response object used to send the response.
     * @returns {void}
     */
    loginUser = ( req: Request, res: Response ) => {
        const [ error, userDTO ] = LoginUserDto.create( req.body );
        if ( error ) return res.status( 400 ).json( error );

        this._authService.loginUser( userDTO! )
            .then( user => res.json( user ) )
            .catch( err => CustomError.handleError( err, res ) );
    }

    /**
     * This method validates an email.
     * @param {e.Request} req - The request object.
     * @param {e.Response} res - The response object.
     *
     * @return {void} - This method does not return any value.
     */
    validateEmail = ( req: Request, res: Response ) => {

        const { token } = req.params;

        console.log( 'Token:', token );

        this._authService.validateEmail( token )
            .then( () => res.json( 'Email validated' ) )
            .catch( err => CustomError.handleError( err, res ) );

    }

}
