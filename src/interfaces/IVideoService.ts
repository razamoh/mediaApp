
export interface IVideoService {
    onProcess(media_id: string, timecode: string): Promise<void>;
}
