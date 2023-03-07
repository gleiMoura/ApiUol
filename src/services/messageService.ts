
import db from "../config/index.js";
import dayjs from "dayjs";
import { messageType } from "../interfaces/index.js";
import QueryString from "qs";

type limitType = QueryString.ParsedQs | QueryString.ParsedQs[] | string | string[] | undefined
type userType = string | string[] | undefined

export async function gatherDatas(data: messageType, user: userType) {
    const participant = await db.collection("participants").findOne({ name: user });

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

    await db.collection("messages").insertOne(completeMessage);
};

export async function getMessages(limit: limitType, user: userType) {
    const allMessagesFrom = {
        from: user
    };
    const allMessagesTo = {
        to: user
    };
    const messagesFrom = await db.collection("messages").find(allMessagesFrom).toArray();
    const messagesTo = await db.collection("messages").find(allMessagesTo).toArray();

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