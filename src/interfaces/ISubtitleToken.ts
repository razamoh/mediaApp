export interface ISubtitleToken {
    lineNo: number;
    text: string;
    startTime: string;
    endTime: string;
    misSpelled: boolean; //possibiliy of words mistake: mitsake for mistake
    corrections : string[]; //Misspelled words or possibility of used words
}
