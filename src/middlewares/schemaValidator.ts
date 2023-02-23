import { Request, Response, NextFunction } from "express";

export default function schemaValidator( schema: any) {
    return (req: Request, res: Response, next: NextFunction ) => {
        const requests = req.body;

        requests.forEach(request => {
            const validation = schema.validate(request, {  abortEarly: false});
            if(validation.error) {
                return res.status(410).send(validation.error.details);
            }
        })

        next();
    }
}