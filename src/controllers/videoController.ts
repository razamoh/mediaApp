import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { IVideoService } from '@interfaces/IVideoService';
import { TYPES } from '../types';
import { BaseController } from './baseController';

@injectable()
export class VideoController extends BaseController {

    constructor(
        @inject(TYPES.VideoService) private videoService: IVideoService
    ) {
        super();
     }  


          //trigger Audio Clipping  processing for a given media time code
    async onGetVideoClip(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { media_id, timecode } = req.params;

        // Basic validation to make sure media_id is availablr and valid
        if (!this.isValidMediaId(media_id)) {
            return this.processNext('Invalid media ID format', next);
        }

        try {
            await this.videoService.onProcess(media_id, timecode);
            res.status(202).json({ message: 'Video Clipping processing started.' }); // Use 202 since processing is async
        } catch (e) {
            // TODO : Implement Custom Error Handling - 
            console.log(e);
            return this.processNext("Video processing error", next)
        }
    }
}