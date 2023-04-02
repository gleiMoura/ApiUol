
import dayjs from "dayjs";
import { fromType, messageType, toType } from "../interfaces/index";
import participantRepository from "../repository/participantRepository";
import messageRepository from "../repository/messagesRepository";
import { limitType, userType } from "../interfaces/index";
import { completeMessageType } from "../interfaces/index";

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
    const messagesFrom: completeMessageType[] = await messageRepository.findMessages(from);
    const messagesTo: completeMessageType[] = await messageRepository.findMessages(to);

    const allMessages = [
        ...messagesFrom,
        ...messagesTo
    ];

    if(limit && typeof limit === 'string') {
        const limitNumber = parseInt(limit);
        let messagesWithLimit: object[] = [];
        allMessages.forEach((message: object, index) => {
            if(index < limitNumber) {
                messagesWithLimit.push(message);
            };
        });

        return messagesWithLimit;
    }

    return allMessages;
};

export default {
    gatherDatas,
    getMessages
};