import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { IMediaService } from '@interfaces/IMediaService';
import { BaseController } from '@controllers/baseController';
import { TYPES } from '../types';

@injectable()
export class MediaController extends BaseController {
    constructor(
        @inject(TYPES.MediaService) private mediaService: IMediaService
    ) { 
        super()
    } 

    async getClip(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { media_id , timecode } = req.params;

        // Basic validation to make sure media_id is availablr and valid - base controller
        if (!this.isValidMediaId(media_id)) {
            return this.processNext('Invalid media ID format', next);
        }

        try {
            await this.mediaService.onProcess(media_id, timecode);
            res.status(202).json({ message: 'Rendered processing started.' });
        } catch (e) {
            // TODO : Implement Custom Error Handling - 
            console.log(e);
            return this.processNext("Subtitle processing error", next)
        }
    }
}

