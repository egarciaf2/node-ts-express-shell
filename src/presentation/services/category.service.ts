import { CreateCategoryDto, CustomError, UserEntity } from "../../domain";
import { CategoryModel } from "../../data";

export class CategoryService {

    constructor() {
    }

    async createCategory( createCategoryDto: CreateCategoryDto, user: UserEntity ) {

        const categoryExist = await CategoryModel.findOne( { name: createCategoryDto.name } );
        if ( categoryExist ) throw CustomError.badRequest( 'Category already exists' );

        try {
            const newCategory = new CategoryModel( {
                ...createCategoryDto,
                user: user.id
            } );
            await newCategory.save();

            return createCategoryDto;

        } catch ( error ) {
            throw CustomError.internalServerError( `${ error }` );
        }

    }

    async getCategories() {
        try {
            const categories = await CategoryModel.find();
            return categories?.map( category => ({
                id:        category._id,
                name:      category.name,
                available: category.available,
            }) );
        } catch ( error ) {
            throw CustomError.internalServerError( `${ error }` );
        }
    }

    async getCategory( idCategory: string ) {
        try {
            const category = await CategoryModel.findOne( { _id: idCategory } );
            return {
                id:        category?._id,
                name:      category?.name,
                available: category?.available,
            }
        } catch ( error ) {
            throw CustomError.internalServerError( `${ error }` );
        }
    }

    updateCategory = () => {
        return 'Category updated';
    }

    deleteCategory = () => {
        return 'Category deleted';
    }

}
