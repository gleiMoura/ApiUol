import participantService from "../services/participantService";
import { Request, Response } from "express";


export async function createRegister(req: Request, res: Response) {
    const { name } = req.body;

    const message = await participantService.registerParticipant(name);

    res.status(201).send(message);
};

export async function getPartipantsList(req: Request, res: Response) {
    const participants = await participantService.getAllParticipants();

    res.status(201).send(participants)
}

