import { ISubtitleToken } from '@interfaces/ISubtitleToken';

export interface ITokenService {
    tokenize(subtitle: string): ISubtitleToken[];
}
