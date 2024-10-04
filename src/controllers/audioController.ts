import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { TYPES } from '../types';
import { BaseController } from './baseController';
import { IAudioService } from '@interfaces/IAudioService';

@injectable()
export class AudioController extends BaseController {

    constructor(
        @inject(TYPES.AudioService) private audioService: IAudioService
    ) {
        super();
     }  

     //trigger Audio Clipping  processing for a given media time code
    async onGetAudioClip(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { media_id, timecode } = req.params;

        // Basic validation to make sure media_id is availablr and valid
        if (!this.isValidMediaId(media_id)) {
            return next(new Error('Invalid media ID format')); // if it's missing or doesn't match pattern, error out
        }

        try {
            await this.audioService.onProcess(media_id, timecode);
            res.status(202).json({ message: 'Audio Clipping processing started.' }); // Use 202 since processing is async
        } catch (e) {
            // TODO : Implement Custom Error Handling - 
            console.log(e);
            return this.processNext("Audio processing error", next)
        }
    }

}