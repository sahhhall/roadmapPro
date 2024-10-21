import { connectDB } from './infrastructure/database/mongodb/connection';
import { errorHandler } from '@sahhhallroadmappro/common';
import { router } from './presentation/routes/roadmap';
import loggerMiddleware from './presentation/middlewares/loggerMiddleware';
import { adminRoutes } from './presentation/routes/adminRoutes';
import { IServerInterface } from './domain/interfaces/IServer';


export class App {
    constructor(private server: IServerInterface) { }

    async initialize(): Promise<void> {
        this.registerMiddleware()
        this.registerRoutes();
        this.registerErrorHandler();
        await this.connectDB();
    }

    private registerMiddleware(): void {
        this.server.registerMiddleware(loggerMiddleware)
    }

    private registerRoutes(): void {
        this.server.registerRoutes('/api/roadmap', router)
        this.server.registerRoutes('/api/admin/roadmap',adminRoutes)
    }
    private registerErrorHandler(): void {
        this.server.registerErrorHandler(errorHandler as any);
    }
    private async connectDB() {
        try {
            await connectDB();
        } catch (error) {
            console.log('Server could not be started', error);
            process.exit(1);
        }
    }

    async start(port: number): Promise<void> {
        await this.server.start(port)
    }

    async shutdown(): Promise<void> {
        console.log("shut down server");
        //need addd connection closes to  redis and db lateron
    }
}



export default App;