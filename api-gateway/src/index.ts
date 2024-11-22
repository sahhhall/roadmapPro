import express from 'express';
import { ROUTES } from './routes/routes';
import { setupRateLimit } from './ratelimit/ratelimit';
import { setupProxies } from './proxy/proxy';
import { setupAuth } from './auth/auth';
import cookieParser from 'cookie-parser';
import loggingMiddleware from './logger/morgan';
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();


const app = express();
const port = 4001;



app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(loggingMiddleware);

app.use(cookieParser());
// setupRateLimit(app, ROUTES);

// app.get('/api/mentor/mentor-profile/:mentorId', async (req: Request, res: Response, next: NextFunction) => {
//   try {

//     const [mentorData, availibilityData] = await Promise.all([
//       axios.get('http://localhost:3002/api/admin/assessment'),
//       axios.get('http://localhost:3001/api/admin/roadmap'),

//     ]);

//     const combinedData = {
//       assessment: assessmentData.data,
//       roadmap: roadmapData.data,
//       auth: authData.data
//     };

//     res.json(combinedData);
//   } catch (error) {
//     console.error('Error aggregating services:', error);
//   }
// });

setupAuth(app, ROUTES);
setupProxies(app, ROUTES);

app.listen(port, () => {
  console.log(`API-Gateway  running at http://localhost:${port}`);
});
