import express, { Application } from 'express'
import cookieParser from "cookie-parser"
import { IServerInterface } from '../../domain/interfaces/IServer';




export class ExpressWebServer implements IServerInterface {
    private app: Application;
    private server: any;
    constructor() {
        this.app = express();
        this.app.use(cookieParser())
        this.app.use(express.urlencoded());
        this.app.use(express.json());
    }
    async start(port: number): Promise<void> {
        return new Promise(res => {
            this.server = this.app.listen(port, () => {
                console.log(`App listening on port ===> http://localhost:${port}/`);
                res();
            })
        })
    }

    registerMiddleware(middleware: any): void {
        this.app.use(middleware)
    }

    registerRoutes(path: string, router: any): void {
        this.app.use(path, router)
    }
    registerErrorHandler(middleware: any): void {
        this.app.use(middleware)
    }
    async close(): Promise<void> {
        if (this.server) {
            return new Promise((resolve, reject) => {
                this.server.close((err: any) => {
                    if (err) {
                        console.error('Err clsoing', err);
                        return reject(err);
                    }
                    console.log('server closed');
                    resolve();
                });
            });
        }
    }
} 