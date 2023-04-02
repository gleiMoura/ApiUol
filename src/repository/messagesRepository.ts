import db from "../config/index";
import { completeMessageType } from "../interfaces/index";
import { fromType, toType } from "../interfaces/index";

async function createMessage(completeMessage: completeMessageType) {
    try {
        await db.collection("messages").insertOne(completeMessage);
        return "created!"
    } catch (e) {
        console.log(e);
    }
};

async function findMessages(fromOrTo: fromType | toType) {
    try {
        const messages = await db.collection("messages").find(fromOrTo).toArray();
        return messages
    } catch (e) {
        console.log(e);
    };
};

export default {
    createMessage,
    findMessages
}