import { registerParticipant } from "../services/participantService.js";
import { getAllParticipants } from "../services/participantService.js";
import { Request, Response } from "express";


export async function createRegister(req: Request, res: Response) {
    const { name } = req.body;

    const message = await registerParticipant(name);

    res.status(201).send(message);
};

export async function getPartipantsList(req: Request, res: Response) {
    const participants = await getAllParticipants();

    res.status(201).send(participants)
}

