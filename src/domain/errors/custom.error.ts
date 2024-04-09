
import { Response } from 'express';

export class CustomError extends Error {

    private constructor(
        public readonly statusCode: number,
        public readonly message: string,
    ) {
        super( message );
    }

    static handleError( error: any, res: Response ): Response<any> {

        if ( error instanceof CustomError ) {
            return res.status( error.statusCode ).json( error.message );
        }
        console.log( `${ error }` );
        return res.status( 500 ).json( 'Internal server error' );
    }

    static badRequest( message: string ) {
        return new CustomError( 400, message );
    }

    static unauthorized( message: string ) {
        return new CustomError( 401, message );
    }

    static forbidden( message: string ) {
        return new CustomError( 403, message );
    }

    static notFound( message: string ) {
        return new CustomError( 404, message );
    }

    static conflict( message: string ) {
        return new CustomError( 409, message );
    }

    static internalServerError( message: string ) {
        return new CustomError( 500, message );
    }

    static serviceUnavailable( message: string ) {
        return new CustomError( 503, message );
    }

    static custom( statusCode: number, message: string ) {
        return new CustomError( statusCode, message );
    }

}
