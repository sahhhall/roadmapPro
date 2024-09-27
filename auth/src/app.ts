import express from 'express';
import { authRoutes } from './presentation/routes/authRoutes';
import { connectDB } from './config/database';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
class App {
    private readonly app: express.Application;

    constructor() {
        dotenv.config();
        this.app = express();
        this.config();
        this.registerRoutes();
        this.startServer();

    };
    private config() {
        this.app.use(cookieParser())
        this.app.use(express.urlencoded());
        this.app.use(express.json());
    };
    private registerRoutes(): void {
        this.app.use('/api/auth', authRoutes)

    }
    private async startServer() {
        try {
            await connectDB();
            const PORT: number = 3000;
            this.app.listen(process.env.PORT || PORT, () => {
                console.log(`App listening on port ===> http://localhost:${PORT}/`);
            })
        } catch (error) {
            console.error('Server could not be started', error);
            process.exit(1);
        }
    }
}



export default App;