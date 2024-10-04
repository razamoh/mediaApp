import {Media} from '@models/Media'
export interface ISubtitleQueue {
    addToQueue(bucket: string, key: string): Promise<void>;
}
