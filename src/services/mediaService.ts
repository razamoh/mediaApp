import { inject, injectable } from 'inversify';
import { IMediaRepository } from '@interfaces/IMediaRepository';
import { AwsService } from '@services/awsService';
import { SubtitleQueue } from '@services/subtitleQueue';
import { TYPES } from '../types';
import { IMediaService } from '@interfaces/IMediaService';

@injectable()
export class MediaService implements IMediaService {
    constructor(
        @inject(TYPES.MediaRepository) private mediaRepository: IMediaRepository,  
        @inject(TYPES.AwsService) private s3Service: AwsService,                    
        @inject(TYPES.SubtitleQueue) private subtitleQueue: SubtitleQueue, 
    ) {}

    async onProcess(mediaId: string, timecode: string): Promise<void> {
      throw new Error("Need to implement");
    }

    async getClippedVideo(mediaId: string , timecode: string) : Promise<any> {
        throw new Error("Need to implement.Fetch videodeocode api");
    }

    async getAudioClip(mediaId: string , timecode: string, audioFormat:string = "wav") : Promise<any> {
        throw new Error("Need to implement.Fetch audiodecode api for audio format");
    }

    async makeClip(subtitleText: string , audioClipId: string , videClipId: string): Promise<any> {
        throw new Error("Call merge api using params"); 
    }
}
