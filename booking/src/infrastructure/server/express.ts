import express, { Application } from 'express';
import cookieParser from "cookie-parser";
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { IServerInterface } from '../../domain/interfaces/IServer';

export class ExpressWebServer implements IServerInterface {
    private app: Application;
    private server: any;
    private io: Server;
    private rooms: any;

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

        this.rooms = new Map();
        this.setupSocketHandlers();
    }

    private setupSocketHandlers() {
        this.io.on('connection', (socket) => {
            console.log("User connected:", socket.id);

            socket.on("join-room", (payload) => {
                console.log("payload thaat i getting",payload)
                console.log(`User ${socket.id} joining room ${payload.roomId}`);

                if (!this.rooms.has(payload.roomId)) {
                    this.rooms.set(payload.roomId, new Set([socket.id]));
                } else {
                    this.rooms.get(payload.roomId).add(socket.id);
                }

                const others = Array.from(this.rooms.get(payload.roomId)).filter(id => id !== socket.id);
                const otherUser = others[0] as any

                if (otherUser) {
                    socket.emit("other user", otherUser);
                    socket.to(otherUser).emit("user joined", {socketId:socket.id,name: payload.name});
                }

                socket.on("disconnect", () => {
                    console.log(`User ${socket.id} disconnected from room ${payload.roomId}`);
                    if (this.rooms.has(payload.roomId)) {
                        this.rooms.get(payload.roomId).delete(socket.id);
                        if (this.rooms.get(payload.roomId).size === 0) {
                            this.rooms.delete(payload.roomId);
                        }
                    }
                });
            });

            socket.on("offer", (payload) => {
                console.log("Received offer from", socket.id, "to", payload.target);
                this.io.to(payload.target).emit("offer", payload);
            });

            socket.on("answer", (payload) => {
                console.log("Received answer from", socket.id, "to", payload.target);
                this.io.to(payload.target).emit("answer", payload);
            });

            socket.on("ice-candidate", (incoming) => {
                console.log("Received ICE candidate from", socket.id, "to", incoming.target);
                this.io.to(incoming.target).emit("ice-candidate", incoming.candidate);
            });

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










