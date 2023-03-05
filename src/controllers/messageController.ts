import {Request, Response} from "express";
import { messageType } from "../interfaces/index.js";
import { gatherDatas } from "../services/messageService.js";

export async function createMessage(req: Request, res: Response) {
    const data: messageType = req.body;
    const { user } = req.headers;

    await gatherDatas(data, user);

    res.sendStatus(201);
}