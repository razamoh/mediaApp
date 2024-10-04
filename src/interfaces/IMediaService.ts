
export interface IMediaService {
    onProcess(media_id: string, timecode: string): Promise<void>;
    getClippedVideo(mediaId: string , timecode: string) : Promise<any>;
    getAudioClip(mediaId: string , timecode: string, audioFormat:string) : Promise<any>;
    //TODO : Create Proper Inreface for subtitle, audio and video clip attribures
    makeClip(subtitleText: string , audioClip: any , videClip: any): Promise<any>;
}

