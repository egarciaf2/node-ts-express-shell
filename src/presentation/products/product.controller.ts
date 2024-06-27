import { Request, Response } from "express";
import { CreateCategoryDto, CreateProductDto, CustomError } from "../../domain";
import { PaginationDto } from "../../domain/dtos/share/pagination.dto";
import { ProductService } from "../services/product.service";

export class ProductController {

    constructor(
        private readonly _productService: ProductService
    ) {
    }

    createProduct = ( req: Request, res: Response ) => {

        const [ error, createProductDto ] = CreateProductDto.create( {
            ...req.body,
            user: req.body.user.id
        } );
        if ( error ) return res.status( 400 ).json( { error } );

        this._productService.createProduct( createProductDto! )
            .then( product => res.json( product ) )
            .catch( err => CustomError.handleError( err, res ) );

    }

    getProducts = ( req: Request, res: Response ) => {

        const { page = 1, limit = 10 } = req.query;
        const [ error, paginationDto ] = PaginationDto.create( +page, +limit );
        if( error ) return res.status( 400 ).json( { error } );

        this._productService.getProducts( paginationDto! )
            .then( products => res.json( products ) )
            .catch( err => CustomError.handleError( err, res ) );
    }

    getProduct = ( req: Request, res: Response ) => {
        this._productService.getProduct( req.params.idProduct )
            .then( product => res.json( product ) )
            .catch( err => CustomError.handleError( err, res ) );
    }


}
