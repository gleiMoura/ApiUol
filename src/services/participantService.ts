import { participantType } from "../interfaces/index.js";
import participantRepository from "../repository/participantRepository.js";

async function registerParticipant(name: string) {
    const existParticipant = await participantRepository.findParticipant(name);

    if (existParticipant) {
        throw {
            response: {
                message: "Usuário já existe no sistema. Escolha outro nome!",
                status: 409
            }
        }
    }

    await participantRepository.createParticipant(name);

    await participantRepository.createEnterMessage(name);

    return "Participante cadastrado com sucesso!"
};

async function getAllParticipants() :Promise<participantType[]> {
    const participants = await participantRepository.findAllParticipants();
    return participants;
};

export default{
    registerParticipant,
    getAllParticipants
};