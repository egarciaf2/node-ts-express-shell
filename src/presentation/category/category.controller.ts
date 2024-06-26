import { Request, Response } from "express";
import { CreateCategoryDto, CustomError } from "../../domain";
import { CategoryService } from "../services/category.service";
import { PaginationDto } from "../../domain/dtos/share/pagination.dto";

export class CategoryController {

    constructor(
        private readonly _categoryService: CategoryService
    ) {
    }

    createCategory = ( req: Request, res: Response ) => {

        const [ error, createCategoryDto ] = CreateCategoryDto.create( req.body );
        if ( error ) return res.status( 400 ).json( { error } );

        this._categoryService.createCategory( createCategoryDto!, req.body.user )
            .then( category => res.json( category ) )
            .catch( err => CustomError.handleError( err, res ) );

    }

    getCategories = ( req: Request, res: Response ) => {

        const { page = 1, limit = 10 } = req.query;
        const [ error, paginationDto ] = PaginationDto.create( +page, +limit );
        if( error ) return res.status( 400 ).json( { error } );

        this._categoryService.getCategories( paginationDto! )
            .then( categories => res.json( categories ) )
            .catch( err => CustomError.handleError( err, res ) );
    }

    getCategory = ( req: Request, res: Response ) => {
        this._categoryService.getCategory( req.params.idCategory )
            .then( category => res.json( category ) )
            .catch( err => CustomError.handleError( err, res ) );
    }

    updateCategory = ( req: Request, res: Response ) => {
        res.json( 'Category updated' );
    }

    deleteCategory = ( req: Request, res: Response ) => {
        res.json( 'Category deleted' );
    }


}
