import { DataSource } from 'typeorm'
import { Payment } from './entities/payment.entity'
import 'dotenv/config';

// typeORM's DataSource holds your database connection settings and establishes initial database connection

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as any) || 5432,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    logging: true,
    entities: [Payment],
    synchronize: process.env.NODE_ENV !== "production",
})
const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Connected to PostgreSQL database");
        return AppDataSource;
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}

export { connectDB, AppDataSource }
