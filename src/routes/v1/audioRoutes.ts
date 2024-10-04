import { Router } from 'express';
import 'reflect-metadata';
import { AudioController } from '@controllers/index';
//import { errorMiddleware } from '@middlewares/errorMiddleware';
import { validateRequest } from '@middlewares/requestValidationMiddleware';
import  container  from '@config/inversify'; 
import { TYPES } from '../../types';

const audioController = container.get<AudioController>(TYPES.AudioController);

const router = Router();

// Routes
router.post('/:media_id/process', validateRequest, (req, res, next) => audioController.onGetAudioClip(req, res, next));


export default router;
