import {Media} from '@models/Media'
export interface IMediaRepository {
    findSubTitlesByMediaId(media_id: string | number ): Promise<Media[] | null>;
}
