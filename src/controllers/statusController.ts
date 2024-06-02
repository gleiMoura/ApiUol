import { Request, Response } from "express";
import participantService from "../services/participantService";

export async function updateParticipant(req: Request, res: Response) {
    const { user } = req.headers;

    await participantService.searchParticipant(user)

    res.sendStatus(200);
}