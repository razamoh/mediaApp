export interface ISpellingService {
  verifyToken(tokenText: string): Promise<{ isMisspelled: boolean, corrections: string[] }>;
}