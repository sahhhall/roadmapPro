import express from 'express';
import { ROUTES } from './routes/routes';
import { setupRateLimit } from './ratelimit/ratelimit';
import { setupProxies } from './proxy/proxy';
import { setupAuth } from './auth/auth';
import cookieParser from 'cookie-parser';
import loggingMiddleware from './logger/morgan';
import { customLogger } from './logger/logger';
import cors from 'cors'

const app = express();
const port = 4001;



app.use(cors({
    origin: 'http://localhost:5173',  
    credentials: true,  
  }));
customLogger.error("hi")
// app.use(loggingMiddleware);

app.use(cookieParser());
// setupRateLimit(app, ROUTES);
setupAuth(app, ROUTES);
setupProxies(app, ROUTES);

app.listen(port, () => {
    console.log(`API-Gateway  running at http://localhost:${port}`);
});
