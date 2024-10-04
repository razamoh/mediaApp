import { Container } from 'inversify';

// Services 
import { 
    AwsService, SubtitleService, TokenService, SubtitleQueue, SpellingService,
    AudioService, VideoService, MediaService 
} from '@services/index';

// Repositories
import { 
    MediaRepository, TokenRepository 
} from '@repositories/index';

// Controllers
import { 
    AudioController, SubtitleController, VideoController 
} from '@controllers/index'; 

// Interfaces
import { 
    ISubtitleService, IMediaRepository, ITokenRepository, ISubtitleQueue, 
    ITokenService, ISpellingService, IAudioService, IVideoService, IMediaService 
} from '@interfaces/index';

// Types
import { TYPES } from '../types';

const container = new Container();

// Subtitle Related Bindings
container.bind<ISubtitleService>(TYPES.SubtitleService).to(SubtitleService);
container.bind<ISubtitleQueue>(TYPES.SubtitleQueue).to(SubtitleQueue);
container.bind<SubtitleController>(TYPES.SubtitleController).to(SubtitleController);


container.bind<ITokenRepository>(TYPES.TokenRepository).to(TokenRepository);
container.bind<IMediaRepository>(TYPES.MediaRepository).to(MediaRepository);

container.bind<AwsService>(TYPES.AwsService).to(AwsService);
container.bind<AudioController>(TYPES.AudioController).to(AudioController);
container.bind<VideoController>(TYPES.VideoController).to(VideoController);

// Tokenization and Spell Checking Services
container.bind<ITokenService>(TYPES.TokenService).to(TokenService);
container.bind<ISpellingService>(TYPES.SpellingService).to(SpellingService);

// Video & Audio Related Services (TODO: Full Implementation)
container.bind<IAudioService>(TYPES.AudioService).to(AudioService);
container.bind<IVideoService>(TYPES.VideoService).to(VideoService);
container.bind<IMediaService>(TYPES.MediaService).to(MediaService);

export default container;
