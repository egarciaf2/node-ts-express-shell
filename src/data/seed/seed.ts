import { envs } from "../../config";
import { CategoryModel, MongoDatabase, ProductModel, UserModel } from "../mongo";
import { seedData } from "./data";

(async () => {

    await MongoDatabase.connect( {
        mongoUrl: envs.MONGO_URL,
        dbName:   envs.MONGO_DB_NAME
    } );

    await main();

    await MongoDatabase.disconnect();

})();


async function main() {

    //0: Clean data
    await Promise.all( [
        UserModel.deleteMany(),
        CategoryModel.deleteMany(),
        ProductModel.deleteMany()
    ] );
    //1: Create Users
    const users = await UserModel.insertMany( seedData.users );

    //2: Create Categories
    const categories = await CategoryModel.insertMany(
        seedData.categories.map( ( category ) => ({
            ...category,
            user: users[randomBetween0Andx( users.length - 1 )]._id
        }) )
    );

    //3: Create Products

    await ProductModel.insertMany(
        seedData.products.map( ( product ) => ({
            ...product,
            user:      users[randomBetween0Andx( users.length - 1 )]._id,
            category:  categories[randomBetween0Andx( categories.length - 1 )]._id
        }) )
    );


    console.log( '*****************************************************' );
    console.log( '**************** SEEDED DATA COMPLETE ***************' );
    console.log( '*****************************************************' );
}

const randomBetween0Andx = ( x: number ) => Math.floor( Math.random() * x );
