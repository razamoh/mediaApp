import { Router } from 'express';
import 'reflect-metadata';
import { MediaController } from '@controllers/index';
//import { errorMiddleware } from '@middlewares/errorMiddleware';
import { validateRequest } from '@middlewares/requestValidationMiddleware';
import  container  from '@config/inversify'; 
import { TYPES } from '../../types';

const mediaController = container.get<MediaController>(TYPES.SubtitleController);

const router = Router();

// Routes
router.post('/:media_id/process', validateRequest, (req, res, next) => mediaController.getClip(req, res, next));


export default router;
