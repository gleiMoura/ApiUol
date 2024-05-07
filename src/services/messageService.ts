
import dayjs from "dayjs";
import { fromType, messageType, toType } from "../interfaces/index";
import participantRepository from "../repository/participantRepository";
import messageRepository from "../repository/messagesRepository";
import { limitType, userType } from "../interfaces/index";
import messagesRepository from "../repository/messagesRepository";

async function gatherDatas(data: messageType, user: userType) {
    const participant = await participantRepository.findParticipant(user);

    if (!participant) {
        throw {
            response: {
                status: 409,
                message: "Usuário não cadastrado no banco de dados!"

            }
        }
    }
    const completeMessage = {
        ...data,
        from: user,
        time: dayjs().format("HH:mm:ss")
    };

    await messageRepository.createMessage(completeMessage);
};

async function getMessages(limit: limitType, user: userType) {
    const from: fromType = {
        from: user
    };
    const to: toType = {
        to: user
    };
    const allMessagesFromDb = await messageRepository.findMessages();

    const allMessages = allMessagesFromDb.filter((message) => {
        if (message.to === user || message.from === user || message.type === "message" || message.type === "status") {
            return message
        }
    });

    if (limit && typeof limit === 'string') {
        return allMessages.slice(- limit)
    }

    return allMessages;
};

async function deleteMessage(id: any, user: userType) {
    const existMessage: any = await messagesRepository.findMessageById(id);

    if (!existMessage) {
        throw {
            response: {
                status: 404,
                message: "Mensagem nao encontrada!"

            }
        }
    }

    if (existMessage.from !== user) {
        throw {
            response: {
                status: 401,
                message: "Não é dono!"

            }
        }
    }

    await messageRepository.deleteMessageById(id);
};

async function updateMessage(user, id, newMessage) {
    const existMessage: any = await messageRepository.findMessageById(id);

    const existParticipant: any = await participantRepository.findParticipant(user);

    if (!existParticipant) {
        throw {
            response: {
                status: 422,
                message: "Participante não encontrado!"

            }
        }
    }

    if (!existMessage) {
        throw {
            response: {
                status: 404,
                message: "Mensagem nao encontrada!"

            }
        }
    }

    if (existMessage.from !== user) {
        throw {
            response: {
                status: 401,
                message: "Não é dono!"

            }
        }
    }

    await messageRepository.modernizeMessage({ ...newMessage, from: user }, id);
}

export default {
    gatherDatas,
    getMessages,
    deleteMessage,
    updateMessage
};