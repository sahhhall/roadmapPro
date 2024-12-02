import express, { Application } from 'express';
import cookieParser from "cookie-parser";
import { Server } from 'socket.io';
import { createServer } from 'http';
import { IServerInterface } from '../../domain/interfaces/IServer';

export class ExpressWebServer implements IServerInterface {
    private app: Application;
    private server: any;
    private io: Server;

    constructor() {
        this.app = express();
        this.app.use(cookieParser());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        this.server = createServer(this.app);

        this.io = new Server(this.server, {
            cors: {
                origin: process.env.FRONT_END_BASE_URL,
                methods: ["*"]
            },
            path: '/notification-socket/socket.io'
        });

        this.setupSocketHandlers();
    }

    private setupSocketHandlers() {
        this.io.on('connection', (socket) => {
            console.log("User connected:", socket.id);
        });
    }
    public emitToUser(userEmail: string, data: any): void {
        if (this.io) {
            this.io.emit(`user:${userEmail}`, data);
        }
    }

    async start(port: number): Promise<void> {
        return new Promise(res => {
            this.server.listen(port, () => {
                console.log(`App listening on port ===> http://localhost:${port}/`);
                res();
            });
        });
    }

    registerMiddleware(middleware: any): void {
        this.app.use(middleware);
    }

    registerRoutes(path: string, router: any): void {
        this.app.use(path, router);
    }

    registerErrorHandler(middleware: any): void {
        this.app.use(middleware);
    }

    async close(): Promise<void> {
        if (this.server) {
            return new Promise((resolve, reject) => {
                this.server.close((err: any) => {
                    if (err) {
                        console.error('Error closing', err);
                        return reject(err);
                    }
                    console.log('Server closed');
                    resolve();
                });
            });
        }
    }
}










