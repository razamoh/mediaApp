export interface ITokenRepository {
    saveTokens(tokens: any[]): Promise<void>;
    getTokenVersion(mediaId: string): Promise<number>;
}
