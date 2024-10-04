// src/services/SubtitleQueue.ts
import { injectable, inject } from 'inversify';
import { Worker } from 'worker_threads';
import { ITokenRepository } from '@interfaces/ITokenRepository';
import { ISubtitleQueue } from '@interfaces/ISubtitleQueue';
import path from 'path'; 
import { TYPES } from '../types';

// So like, we gonna define a type for messages from worker, makes it safer
interface WorkerResult {
    status: 'success' | 'error';
    tokens?: any[]; // Replace with the actual type of tokens, ya know?
    message?: string;
}

@injectable()
export class SubtitleQueue implements ISubtitleQueue {
    constructor(
        @inject(TYPES.TokenRepository) private tokenRepository: ITokenRepository,
    ) {}

    // Method to add job into the queue, pretty simple
    async addToQueue(bucket: string, key: string): Promise<void> {
        try {
            // Create a new worker to handle the job, easy peasy
            const worker = new Worker(path.resolve(__dirname, 'subtitleWorker.js'), {
                workerData: { bucket, key }, // Just passing data to the worker
            });

            // Listen to messages from the worker
            worker.on('message', async (result: WorkerResult) => {
                if (result.status === 'success') {
                    try {
                        await this.tokenRepository.saveTokens(result.tokens!); // Gonna bulk insert them tokens
                        console.log(`Job done good for key: ${key}`);
                    } catch (err) {
                        console.error(`Failed save tokens for key ${key}: ${err.message}`);
                    }
                } else {
                    console.error(`Job failed with error: ${result.message}`);
                }
            });

            // Handle any errors from the worker
            worker.on('error', (error) => {
                console.error(`Oops! Error from worker: ${error}`);
            });

            // Handle when worker stops running
            worker.on('exit', (code) => {
                if (code !== 0) {
                    console.error(`Worker stopped with exit code of ${code}`);
                }
            });

            // Just adding the job to the queue, you know, for tracking
            console.log(`Job added to the queue for bucket: ${bucket}, key: ${key}`);
        } catch (error) {
            console.error(`Failed adding job to queue: ${error.message}`);
        }
    }
}
