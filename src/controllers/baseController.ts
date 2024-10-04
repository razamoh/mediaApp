import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export abstract class BaseController {
    
    //protected abstract handleRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
    // Handle Error 
    protected handleError(error: Error, res: Response, next: NextFunction): void {
        console.error(error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }

    protected processNext(errorMsg: string, next: NextFunction): void {
        console.error(errorMsg);
        return next(Error( errorMsg || 'Internal Server Error' )); 
    }

    protected isValidMediaId(mediaId: string | undefined): boolean {
        if (!mediaId) return false;
        //TODO: Improve regex
        const validPattern = /^[a-zA-Z0-9-_]+$/; 
        return validPattern.test(mediaId);
    }


}
