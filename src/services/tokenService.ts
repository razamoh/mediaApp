// src/services/TokenService.ts
import { injectable } from 'inversify';
import { ITokenService } from '@interfaces/ITokenService';
import { ISubtitleToken } from '@interfaces/ISubtitleToken';

@injectable()
export class TokenService implements ITokenService {

    /**
     * Tokenizes the subtitle content into structured data.
     * @param subtitle - The raw subtitle content as a string.
     * @returns An array of subtitle tokens with text and timing information.
     */
    tokenize(subtitle: string): ISubtitleToken[]  {
        const lines = subtitle.split('\n');
        const tokens: ISubtitleToken[] = [];

        lines.forEach((line, index) => {
            const [start, end, ...textParts] = line.split(' ');
            const text = textParts.join(' ');

            tokens.push({
                lineNo: index + 1,
                text,
                startTime: (start),//Timecode start time 
                endTime: (end), // time code end tim
                misSpelled: false,  // is this possible mistaken word
                corrections: []       //if its misspelled should it be corrected.
            });
        });
        
        return tokens;
    }
}
