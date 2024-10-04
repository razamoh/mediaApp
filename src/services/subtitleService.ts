import { inject, injectable } from 'inversify';
import { IMediaRepository } from '@interfaces/IMediaRepository';
import { AwsService } from '@services/awsService';
import { SubtitleQueue } from '@services/subtitleQueue';
import { SpellingService } from '@services/spellingService';
import { TokenService } from '@services/tokenService';
import { TYPES } from '../types';
import { ISubtitleToken } from '@interfaces/ISubtitleToken';
import { ISubtitleService } from '@interfaces/ISubtitleService';

@injectable()
export class SubtitleService implements ISubtitleService {
    constructor(
        @inject(TYPES.MediaRepository) private mediaRepository: IMediaRepository,  // So this is our media repo
        @inject(TYPES.AwsService) private s3Service: AwsService,                    // Here's the AWS S3 service we gonna use
        @inject(TYPES.SubtitleQueue) private subtitleQueue: SubtitleQueue,          // And the subtitle queue, ya know
        @inject(TYPES.SpellingService) private spellingService: SpellingService,    // This is for checking spelling
        @inject(TYPES.TokenService) private tokenService: TokenService               // Gotta inject the TokenService too
    ) {}

    /**
     * Process subtitles for a given media by adding them to the queue.
     * @param mediaId - The ID of the media whose subtitles need to be processed.
     */
    async onProcess(mediaId: string): Promise<void> {
        // Let's get the subtitles linked to this media
        const subtitles = await this.mediaRepository.findSubTitlesByMediaId(mediaId);

        if (!subtitles || subtitles.length === 0) {
            throw new Error(`No subtitles found for media ID: ${mediaId}`);
        }

        // Add each subtitle to the queue for some further processing
        for (const subtitle of subtitles) {
            const { bucket, key } = subtitle;
            await this.subtitleQueue.addToQueue(bucket, key); // Adding to the queue, cool?
        }
    }

    /**
     * Process a specific subtitle by fetching it from S3, tokenizing the content,
     * and checking for misspelled words with suggestions.
     * @param bucket - The S3 bucket name where the subtitle is stored.
     * @param key - The S3 key (path) to the subtitle file.
     * @returns A promise that resolves to an array of processed tokens.
     */
    async processSubtitle(bucket: string, key: string): Promise<ISubtitleToken[]> {
        try {
            // Grab the subtitle file from S3 bucket
            const subtitleData = await this.s3Service.getSubtitleFile(bucket, key);

            // Tokenize the subtitle content into some structured tokens
            const tokens = this.tokenService.tokenize(subtitleData);

            // Check each token for misspellings and get some suggestions
            const verifiedTokens = await Promise.all(tokens.map(async (token) => {
                const { isMisspelled, corrections } = await this.spellingService.verifyToken(token.text);
                return {
                    ...token,
                    isMisspelled,
                    suggestions: corrections
                };
            }));

            return verifiedTokens;
        } catch (error) {
            throw new Error(`Failed to process subtitle file at ${bucket}/${key}: ${error}`);
        }
    }
}
