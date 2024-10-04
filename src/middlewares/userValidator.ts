import { Request, Response, NextFunction } from 'express';
import { IProfileRequest } from '@interfaces/IProfileRequest';

import jwt, { JwtPayload } from 'jsonwebtoken';

// A helper function to check if the token has the right user info
function checkPayload(payload: any): payload is IProfileRequest['profile'] {
    // Check if it's a object and has the necessary fields
    return (
        payload &&
        typeof payload === 'object' &&
        'id' in payload &&
        'uname' in payload && 
        'active' in payload && 
        'role' in payload 
    );
}


// Middleware to validate the token
export const validateToken = async (req: IProfileRequest, res: Response, next: NextFunction): Promise<any> => {
    // Get the authorization header (it should be like "Bearer token")
    //Next is only for testing purposes , did not implement proper authentication tet.
    next();
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    // If there's no token, we send a error
    if (!token) {
        return res.status(401).json({ error: 'No token was given. Access denied.' });
    }

    try {
        // Verify the token with secret key
        const secret = process.env.JWT_SECRET_KEY || ''; // Use 'secret' instead of 'secretKey'
        const decoded = jwt.verify(token, secret) as JwtPayload;

        // Check if the decoded token got the right structure
        if (checkPayload(decoded)) {
            // If it’s valid, we attach the profile info to the request
            req.profile = {
                id: decoded.id,
                uname: decoded.uname,
                active: decoded.active,
                role: decoded.role,
            };

            // Move to the next middleware or route
            next();
        } else {
            // If the token's payload is missing fields, return an error
            return res.status(401).json({ error: 'Token payload is invalid. Access denied.' });
        }

    } catch (error) {
        // Catch any errors during token verification (like expiration or tampering)
        return res.status(401).json({ error: 'Invalid token. Access denied.' });
    }
};
