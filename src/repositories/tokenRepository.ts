import { Token } from '@models/Token'; // Ensure this is the correct path for your Token model
import { ITokenRepository } from '@interfaces/ITokenRepository'; // Ensure this interface is defined
//import { RepositoryError } from '@errors/RepositoryError'; // Custom error class for better error handling
import { injectable } from 'inversify';

@injectable()

export class TokenRepository implements ITokenRepository {
    /**
     * Saves multiple tokens to the database.
     * @param tokens - An array of tokens to be saved.
     */
    async saveTokens(tokens: Token[]): Promise<void> {
        try {
            await Token.bulkCreate(tokens, { validate: true }); // Validate the tokens before saving
        } catch (error) {
            // Handle any errors that occur during the save operation
            throw new Error('Error saving tokens');
        }
    }

    /**
     * Retrieves the last version of tokens  for the media ID.
     * @param mediaId
     * @returns  the last  version number version or 0.
     */
    async getTokenVersion(mediaId: string): Promise<number> {
        try {
            const result = await Token.max('version', {
                where: { media_id: mediaId },
            });
            return (result !== null || result !== undefined) ? (result as number) : 0; // Return the max version or 0 if none exist
        } catch (error) {
            // Handle any errors that occur during the retrieval operation
            throw new Error('Error retrieving token version');
        }
    }
}
