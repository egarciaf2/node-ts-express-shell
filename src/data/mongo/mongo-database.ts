import mongoose from "mongoose";

interface MongoOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {

    constructor(private options: MongoOptions) {}

    static async connect(options: MongoOptions) {
        const { mongoUrl, dbName } = options;

        try {
            await mongoose.connect(mongoUrl, {
                dbName: dbName,
            });

            return true;

        } catch ( error ) {
            console.log('MongoDB connection error: ', error);
            throw error;
        }

    }
}
