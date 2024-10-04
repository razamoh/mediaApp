export interface ISubtitleService {
    onProcess(media_id: string): Promise<void>;
    processSubtitle(bucket: string, key: string): Promise<any[]>; // Ensure this method is defined
}
