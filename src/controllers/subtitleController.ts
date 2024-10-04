import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { ISubtitleService } from '@interfaces/ISubtitleService';
import { BaseController } from '@controllers/baseController';
import { TYPES } from '../types';

@injectable()
export class SubtitleController extends BaseController {
    constructor(
        @inject(TYPES.SubtitleService) private subtitleService: ISubtitleService
    ) { 
        super()
    }  // TODO : Verify with container

    //trigger subtitle processing for a given media
    async onProcessRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { media_id } = req.params;

        // Basic validation to make sure media_id is availablr and valid - base controller
        if (!this.isValidMediaId(media_id)) {
            return this.processNext('Invalid media ID format', next); // if it's missing or doesn't match pattern, error out
        }

        try {
            await this.subtitleService.onProcess(media_id);
            res.status(202).json({ message: 'Subtitle processing started.' }); // Use 202 since processing is async
        } catch (e) {
            // TODO : Implement Custom Error Handling - 
            console.log(e);
            return this.processNext("Subtitle processing error", next)
        }
    }
}

