import { Router } from 'express';
import 'reflect-metadata';
import { VideoController } from '@controllers/index';
//import { errorMiddleware } from '@middlewares/errorMiddleware';
import { validateRequest } from '@middlewares/requestValidationMiddleware';
import  container  from '@config/inversify'; 
import { TYPES } from '../../types';

const videoController = container.get<VideoController>(TYPES.SubtitleController);

const router = Router();

// Routes
router.post('/:media_id/process', validateRequest, (req, res, next) => videoController.onGetVideoClip(req, res, next));


export default router;
