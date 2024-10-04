import { inject, injectable } from 'inversify';
import { IMediaRepository } from '@interfaces/IMediaRepository';
import { AwsService } from '@services/awsService';
import { SubtitleQueue } from '@services/subtitleQueue';
import { TYPES } from '../types';
import { IVideoService } from '@interfaces/IVideoService';

@injectable()
export class VideoService implements IVideoService {
    constructor(
        @inject(TYPES.MediaRepository) private mediaRepository: IMediaRepository,  
        @inject(TYPES.AwsService) private s3Service: AwsService,                    
        @inject(TYPES.SubtitleQueue) private subtitleQueue: SubtitleQueue, 
    ) {}

    async onProcess(mediaId: string, timecode: string): Promise<void> {
      throw new Error("Need to implement");
    }
}
