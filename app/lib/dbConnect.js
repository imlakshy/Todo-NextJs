import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cachedDb = null;

async function dbConnect() {
    if (cachedDb) {
        return cachedDb;
    }

    await mongoose.connect(MONGODB_URI)
    cachedDb = mongoose.connection.db;
    return cachedDb;
}

export default dbConnect;