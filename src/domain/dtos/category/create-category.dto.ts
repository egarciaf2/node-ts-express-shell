import { regularExps } from "../../../config";

export class CreateCategoryDto {

    private constructor(
        private readonly name: string,
        private readonly available: boolean,
    ) {
    }

    static create( obj: { [key: string]: any } ): [ string?, CreateCategoryDto? ] {

        const { name, available } = obj;
        let availableBoolean = available;

        if ( !name ) return [ 'Missing name' ];
        if ( typeof available !== "boolean" ) {
            availableBoolean = availableBoolean === 'true';
        }

        return [ undefined, new CreateCategoryDto(
            name,
            availableBoolean,
        ) ];
    }

}
