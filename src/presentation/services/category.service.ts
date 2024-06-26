import { CreateCategoryDto, CustomError, UserEntity } from "../../domain";
import { CategoryModel } from "../../data";
import { PaginationDto } from "../../domain/dtos/share/pagination.dto";

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

    async getCategories( paginationDto: PaginationDto ) {
        const { page, limit } = paginationDto;

        try {

            const [ total, categories ] = await Promise.all( [
                CategoryModel.countDocuments(),
                CategoryModel.find().skip( (page - 1) * limit ).limit( limit )
            ] );

            return {
                page,
                limit,
                total,
                next:     `/api/categories?page=${ page + 1 }&limit=${ limit }`,
                previous: page > 1 ? `/api/categories?page=${ page - 1 }&limit=${ limit }` : null,
                data:     categories.map( category => ({
                    id:        category._id,
                    name:      category.name,
                    available: category.available,
                }) )
            }

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
