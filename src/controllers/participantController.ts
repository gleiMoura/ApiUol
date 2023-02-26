import { registerParticipant } from "../services/participantService.js";
import { Request, Response } from "express";


export async function createRegister(req: Request, res: Response) {
    const { name } = req.body;

    const request = await registerParticipant(name);

    res.status(201).send(request);
}