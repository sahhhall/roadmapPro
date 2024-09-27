import mongoose from "mongoose";



const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/auth');
        console.log("Mongodb Connectd")
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

export { connectDB }