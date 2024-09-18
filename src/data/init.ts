import mongoose from "mongoose";

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    static async connect({ mongoUrl, dbName }: ConnectionOptions) {
        try {
            await mongoose.connect(mongoUrl, { dbName });
            console.log(`Conexión exitosa a MongoDB: ${dbName}`);
        } catch (error) {
            console.error(`Error conectandose a MongoDB: ${error}`);
        }
    }
}