import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export function validateRequest(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        media_id: Joi.string().required(),
    });

    const { error } = schema.validate(req.params);

    if (error) {
        res.status(400).json({ message: error.details[0].message });
    } else {
        next(); // If validation passes, call `next`
    }
}
