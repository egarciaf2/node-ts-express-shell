import { CreateCategoryDto, CreateProductDto, CustomError, UserEntity } from "../../domain";
import { CategoryModel, ProductModel } from "../../data";
import { PaginationDto } from "../../domain/dtos/share/pagination.dto";

export class ProductService {

    constructor() {
    }

    async createProduct( createProductDto: CreateProductDto ) {

        const productExist = await ProductModel.findOne( { name: createProductDto.name } );
        if ( productExist ) throw CustomError.badRequest( 'Product already exists' );

        try {
            const product = new ProductModel( createProductDto );
            await product.save();
            return product;
        } catch ( error ) {
            throw CustomError.internalServerError( `${ error }` );
        }

    }

    async getProducts( paginationDto: PaginationDto ) {
        const { page, limit } = paginationDto;

        try {

            const [ total, products ] = await Promise.all( [
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip( (page - 1) * limit )
                    .limit( limit )
                    .populate( 'user' )
                    .populate( 'category' )
            ] );

            return {
                page,
                limit,
                total,
                next:     `/api/products?page=${ page + 1 }&limit=${ limit }`,
                previous: page > 1 ? `/api/products?page=${ page - 1 }&limit=${ limit }` : null,
                data:     products
            }

        } catch ( error ) {
            throw CustomError.internalServerError( `${ error }` );
        }
    }

    async getProduct( idProduct: string ) {
        try {
            console.log('idProduct', idProduct)
            return await ProductModel.findOne( { _id: idProduct } )
                .populate( 'user' )
                .populate( 'category' );
        } catch ( error ) {
            throw CustomError.internalServerError( `${ error }` );
        }
    }

    updateCategory = () => {

    }

    deleteCategory = () => {
        return 'Category deleted';
    }

}
