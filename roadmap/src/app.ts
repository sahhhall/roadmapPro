import express from 'express';
import { connectDB } from './infrastructure/database/mongodb/connection';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import { errorHandler } from '@sahhhallroadmappro/common';
import { router } from './presentation/routes/roadmap';
import loggerMiddleware from './presentation/middlewares/loggerMiddleware';
class App {
    private readonly app: express.Application;

    constructor() {
        dotenv.config();
        this.app = express();
        this.config();
        this.registerRoutes();
        this.registerErrorHandler();
        this.startServer();

    };
    private config() {
        this.app.use(cookieParser())
        this.app.use(express.urlencoded());
        this.app.use(express.json());
        this.app.use(loggerMiddleware)
    };
    private registerRoutes(): void {
        this.app.use('/api/roadmap', router)
    }
    private registerErrorHandler(): void {
        this.app.use(errorHandler as any);
    }
    private async startServer() {
        try {
            await connectDB();
            const PORT: number = 3001;
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