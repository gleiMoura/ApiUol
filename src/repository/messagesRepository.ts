import db from "../config/index.js";
import { completeMessageType } from "../interfaces/index.js";
import { fromType, toType } from "../interfaces/index.js";

async function createMessage(completeMessage: completeMessageType) {
    try {
        await db.collection("messages").insertOne(completeMessage);
        return "created!"
    } catch (e) {
        return {
            error: e,
            message: "don't created message!"
        }
    }
};

async function findMessages(fromOrTo: fromType | toType) {
    try {
        const messages = await db.collection("messages").find(fromOrTo).toArray();
        return messages;
    } catch (e) {
        return {
            error: e,
            message: "don't find messages"
        };
    };
};

export default {
    createMessage,
    findMessages
}