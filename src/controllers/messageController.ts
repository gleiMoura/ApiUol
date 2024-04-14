import {Request, Response} from "express";
import { messageType } from "../interfaces/index";
import messageService from "../services/messageService";

export async function createMessage(req: Request, res: Response) {
    const data: messageType = req.body;
    const { user } = req.headers;

    await messageService.gatherDatas(data, user);

    res.sendStatus(201);
};

export async function getAllMessages(req: Request, res: Response) {
    const { limit } = req?.query;
    const { user } = req?.headers;

    const messages = await messageService.getMessages(limit, user);

    res.status(201).send(messages);
} 