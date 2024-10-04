import { Router } from 'express';
import 'reflect-metadata';
import { SubtitleController } from '@controllers/subtitleController';
//import { errorMiddleware } from '@middlewares/errorMiddleware';
import { validateRequest } from '@middlewares/requestValidationMiddleware';
import  container  from '@config/inversify'; 
import { TYPES } from '../../types';

const subtitleController = container.get<SubtitleController>(TYPES.SubtitleController);

const router = Router();

// Routes
router.post('/:media_id/process', validateRequest, (req, res, next) => subtitleController.onProcessRequest(req, res, next));


export default router;
