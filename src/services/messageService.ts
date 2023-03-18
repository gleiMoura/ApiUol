
import db from "../config/index.js";
import dayjs from "dayjs";
import { fromType, messageType, toType } from "../interfaces/index.js";
import { findParticipant } from "../repository/participantRepository.js";
import { limitType, userType } from "../interfaces/index.js";
import { createMessage, findMessages } from "../repository/messagesRepository.js";
import { completeMessageType } from "../interfaces/index.js";

export async function gatherDatas(data: messageType, user: userType) {
    const participant = await findParticipant(user);

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

    await createMessage(completeMessage);
};

export async function getMessages(limit: limitType, user: userType) {
    const from: fromType = {
        from: user
    };
    const to: toType = {
        to: user
    };
    const messagesFrom: completeMessageType[] = await findMessages(from);
    const messagesTo: completeMessageType[] = await findMessages(to);

    const allMessages = [
        ...messagesFrom,
        ...messagesTo
    ];

    if(typeof limit === 'string') {
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
}