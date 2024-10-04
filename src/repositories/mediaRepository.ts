import { Media } from '@models/Media'; 
//import { RepositoryError } from '@errors/RepositoryError';
import { injectable } from 'inversify';
import { IMediaRepository } from '@interfaces/IMediaRepository';

@injectable()
export class  MediaRepository implements IMediaRepository {
    /**
     * Finds a subtile records record by media ID.
     * @param mediaId - PK to reterive subtitle meta info.
     * @returns Media (subtitle meta) objects or null if not found.
     */
    async findSubTitlesByMediaId(mediaId: string): Promise<Media[] | null> {
        try {
            const data = await Media.findAll({ where: { media_id: mediaId } });
            return data; // SubTitle Meta and bucket and key for s3
        } catch (error) {
            // Handle any errors that occur during the database operation
            throw new Error('Media Subtitles not found.');
        }
    }
}
