import { Request, Response } from "express";
import { CreateCategoryDto } from "../../domain";

export class CategoryController {

    constructor() {
    }

    createCategory = ( req: Request, res: Response ) => {

        const [ error, createCategoryDto ] = CreateCategoryDto.create( req.body );
        if ( error ) return res.status( 400 ).json( error );

        res.json( createCategoryDto );
    }

    getCategories = ( req: Request, res: Response ) => {
        res.json( 'Categories' );
    }

    getCategory = ( req: Request, res: Response ) => {
        res.json( 'Category' );
    }

    updateCategory = ( req: Request, res: Response ) => {
        res.json( 'Category updated' );
    }

    deleteCategory = ( req: Request, res: Response ) => {
        res.json( 'Category deleted' );
    }


}
