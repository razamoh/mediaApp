import AWS from 'aws-sdk';
import { injectable } from 'inversify';

@injectable()
export class AwsService {
    private s3: AWS.S3;

    constructor() {
        // Initialize the S3 client with configuration from environment variables
        this.s3 = new AWS.S3({
            region: process.env.AWS_REGION, // Set your AWS region here
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }

    /**
     * Retrieve a subtitle file from S3
     * @param bucket - The name of the S3 bucket
     * @param key - The key (file path) of the subtitle file
     * @returns The content of the subtitle file as a string
     */
    async getSubtitleFile(bucket: string, key: string): Promise<string> {
        const params = { Bucket: bucket, Key: key };

        try {
            const data = await this.s3.getObject(params).promise();
            return data.Body ? data.Body.toString('utf-8') : ''; // Handle empty bodies
        } catch (error) {
            console.error('Error retrieving subtitle file from S3:', error);
            throw new Error(`Could not retrieve file from S3: ${error}`);
        }
    }
}

