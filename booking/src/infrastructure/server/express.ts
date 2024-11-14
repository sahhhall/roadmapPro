import express, { Application } from 'express';
import cookieParser from "cookie-parser";
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { IServerInterface } from '../../domain/interfaces/IServer';

export class ExpressWebServer implements IServerInterface {
    private app: Application;
    private server: any;
    private io: Server;
    private emailToSocketIdMap: any;
    private socketidToEmailMap: any;

    constructor() {
        this.app = express();
        this.app.use(cookieParser());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        this.server = createServer(this.app);

        this.io = new Server(this.server, {
            cors: {
                origin: "http://localhost:5173",
                methods: ["GET", "POST"]
            }
        });

        this.emailToSocketIdMap = new Map();
        this.socketidToEmailMap = new Map();
        this.setupSocketHandlers();
    }

    private setupSocketHandlers() {
        this.io.on('connection', (socket) => {
            console.log('Socket connected:', socket.id);
            socket.on('room:join', async (data) => {
                const { email, room } = data;
                console.log(this.emailToSocketIdMap, this.socketidToEmailMap)
                // to map email to socketidconso
                this.emailToSocketIdMap.set(email, socket.id)
                this.socketidToEmailMap.set(socket.id, email)
                console.log(socket.id)
                // this emits an event to all clients in the specified room
                this.io.to(room).emit("user:joined", { email, id: socket.id })
                //it should tell client paritelar socket join room
                await socket.join(room);

                this.io.to(socket.id).emit("room:join", data)
            })


            socket.on('user:call', ({ to, offer }) => {
                console.log("user: call", to, offer)
                this.io.to(to).emit('incoming:call', { from: socket.id, offer })
            })

            socket.on('call:accepted', ({ to, ans }) => {
                console.log("accepted: call", to, ans)
                this.io.to(to).emit('call:accepted', { from: socket.id, ans })
            })

            socket.on('peer:nego:needed', ({ to, offer }) => {
                console.log("nego: needed", to, offer)
                this.io.to(to).emit('peer:nego:needed', { from: socket.id, offer })
            })

            socket.on('peer:nego:done', ({ to, ans }) => {
                this.io.to(to).emit('peer:nego:final', { from: socket.id, ans })
            })
        });
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










