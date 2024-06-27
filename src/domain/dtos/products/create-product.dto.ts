import { Validators } from "../../../config/validators";

export class CreateProductDto {

    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly category: string,
        public readonly user: string
    ) {
    }

    static create( props: { [key: string]: any } ): [ string?, CreateProductDto? ] {

        const { name, available, price, description, category, user } = props;

        console.log('>>>>User****************************', user)
        if ( !name ) return [ 'Name is required' ];
        if ( !price ) return [ 'Price is required' ];
        if ( !description ) return [ 'Description is required' ];
        if ( !Validators.isMongoId(category) ) return [ 'Invalid Category ID' ];
        if ( !Validators.isMongoId(user) ) return [ 'Invalid User ID' ];

        return [ undefined, new CreateProductDto(
            name,
            !!available,
            price,
            description,
            category,
            user
        ) ];
    }

}
