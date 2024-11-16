import mongoose from "mongoose";



const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGO_URI must defined")
    }
    const MONGO_URI = process.env.MONGODB_URI
    try {
        await mongoose.connect(`${MONGO_URI}/notification`);
        console.log("connected to mongodb")
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log("mongo disconnected")
    } catch (error) {
        console.log("err while disconnecting db")
    }
}

export { connectDB, disconnectDB }