import { Request, Response, NextFunction } from "express";
import joi from "joi";

export default function schemaValidator( schema: joi.AnySchema) {
    return (req: Request, res: Response, next: NextFunction ) => {
        const requests: object[] = req.body;

        requests.forEach(request => {
            const validation = schema.validate(request, {  abortEarly: false});
            if(validation.error) {
                return res.status(410).send(validation.error.details);
            }
        })

        next();
    }
}