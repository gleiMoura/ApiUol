import { participantType } from "../interfaces/index.js";
import { createEnterMessage, createParticipant, findAllParticipants, findParticpant } from "../repository/participantRepository.js";

export async function registerParticipant(name: string) {
    const existParticipant = await findParticpant(name);

    if (existParticipant) {
        throw {
            response: {
                message: "Usuário já existe no sistema. Escolha outro nome!",
                status: 409
            }
        }
    }

    await createParticipant(name);

    await createEnterMessage(name);

    return "Participante cadastrado com sucesso!"
};

export async function getAllParticipants() :Promise<participantType[]> {
    const participants = await findAllParticipants();
    return participants;
}