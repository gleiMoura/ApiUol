import db from "../config/index.js";
import dayjs from "dayjs";
import { participantType } from "../interfaces/index.js";

export async function registerParticipant(name: string) {
    const existParticipant = await db.collection('participants').findOne({name})

    if (existParticipant) {
        throw {
            response: {
                message: "Usuário já existe no sistema. Escolha outro nome!",
                status: 409
            }
        }
    }

    await db.collection("participants").insertOne({
        name,
        lastStatus: Date.now()
    });

    await db.collection("messages").insertOne({
        from: name,
        to: 'Todos',
        text: 'entra na sala...',
        type: 'status',
        time: dayjs().format('HH:mm:ss')
    });

    return "Participante cadastrado com sucesso!"
};

export async function getAllParticipants() :Promise<participantType[]> {
    const participants = await db.collection("participants").find({}).toArray();
    return participants;
}