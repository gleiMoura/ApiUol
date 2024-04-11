import { participantType, userType } from "../interfaces/index";
import participantRepository from "../repository/participantRepository";

async function registerParticipant(name: userType) {
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

async function searchParticipant(name: userType) {
    const existParticipant = await participantRepository.updateParticipant(name);

    if (!existParticipant) {
        throw {
            response: {
                status: 404
            }
        }
    }
}

async function getAllParticipants(): Promise<participantType[]> {
    const participants = await participantRepository.findAllParticipants();
    return participants;
};

export default {
    registerParticipant,
    getAllParticipants,
    searchParticipant
};