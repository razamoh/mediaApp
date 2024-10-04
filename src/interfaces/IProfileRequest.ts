import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface IProfileRequest extends Request {
    profile?: {
        id: number;
        uname: string;
        active: boolean;
        role: string;
    };
}
