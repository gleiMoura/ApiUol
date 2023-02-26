import { Request, Response } from "express";

async function errorHandler( error, req: Request, res: Response) {
    console.log(error)
    if(error.response) {
        res.status(error.response.status).send(error.response.message);
    }

    res.sendStatus(500);
};

export default errorHandler;