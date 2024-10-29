import App from "./app";
import dotenv from 'dotenv';
import { ExpressWebServer } from "./infrastructure/server/express";


dotenv.config();

const PORT: number = Number(process.env.PORT) || 3003;
const server = new ExpressWebServer();
const app = new App(server)
app.initialize().then(() => {
    app.start(PORT)
}).catch((error) => {
    console.log('failed to start server', error)
})



const shutdownHandler = async () => {
    console.log('reviced shutdown signal');
    try {
        await app.shutdown();
        await server.close()
        process.exit(0)
    } catch (error) {
        console.log('error during shutdown', error);
        process.exit(1)
    }

};

process.on('SIGINT', shutdownHandler)
process.on('SIGTERM', shutdownHandler)

