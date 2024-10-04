import { AudioController } from "@controllers/audioController";

export const TYPES = {
    SubtitleService: Symbol.for('SubtitleService'),
    MediaRepository: Symbol.for('MediaRepository'),
    TokenRepository: Symbol.for('TokenRepository'),
    AwsService: Symbol.for('AwsService'),
    SubtitleController: Symbol.for('SubtitleController'), 
    VideoController: Symbol.for('VideoController'), 
    AudioController: Symbol.for('AudioController'),
    SubtitleQueue:Symbol.for('SubtitleQueue'),
    SpellingService:Symbol.for('SpellingService'),
    TokenService:Symbol.for('TokenService'),
    AudioService:Symbol.for('AudioService'),
    VideoService:Symbol.for('VideoService'),
    MediaService:Symbol.for('MediaService')
   // VideoQueue:Symbol.for('VideoQueue'),
  // AudioQueue:Symbol.for('AudioQueue'),
};

