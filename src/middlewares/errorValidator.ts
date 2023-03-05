import { Request, Response, NextFunction } from "express";

async function errorHandler( error, req: Request, res: Response, next: NextFunction ) {
    if(error.response) {
        res.status(error.response.status).send(error.response.message);
    }else{
        res.sendStatus(500)
    }
};

export default errorHandler;