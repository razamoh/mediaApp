import express from 'express';
import helmet from 'helmet';
import 'reflect-metadata';
import { SubtitleController } from '@controllers/index';
import { errorMiddleware } from '@middlewares/errorMiddleware';
import { validateToken }  from '@middlewares/userValidator';

import appRoutes from '@routes/index';

const app = express();
app.use(helmet());
app.use(express.json());   
//TODO : use cors lib to from CORS Error    

//NOTE:V1 version - Use Default controller all the time 
//NOTE:if v2 update needed use v2 folder in the Controllers 
app.use('/api/v1/', validateToken, appRoutes);
//app.use('/api/v1/', validateToken, videoRoutes);
// Error Handling Middleware
app.use(errorMiddleware);

export default app;
