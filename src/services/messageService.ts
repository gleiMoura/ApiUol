
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
    const messagesFrom = await messageRepository.findMessages(from);
    const messagesTo = await messageRepository.findMessages(to);

    const allMessages = [
        ...messagesFrom,
        ...messagesTo
    ];

    if (limit && typeof limit === 'string') {
        const limitNumber = parseInt(limit);
        let messagesWithLimit: object[] = [];
        allMessages.forEach((message: object, index) => {
            if (index < limitNumber) {
                messagesWithLimit.push(message);
            };
        });

        return messagesWithLimit;
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

    await messageRepository.deleteMessageByMessage(existMessage);
}

export default {
    gatherDatas,
    getMessages,
    deleteMessage
};