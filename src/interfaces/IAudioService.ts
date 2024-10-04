
export interface IAudioService {
    onProcess(media_id: string, timecode: string): Promise<void>;
}

