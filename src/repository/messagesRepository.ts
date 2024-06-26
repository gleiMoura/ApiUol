import db from "../config/index";
import dayjs from "dayjs";
import { completeMessageType } from "../interfaces/index";
import { userType } from "../interfaces/index";
import { ObjectId } from "mongodb";

async function createMessage(completeMessage: completeMessageType) {
    try {
        const database = await db;
        await database.collection("messages").insertOne(completeMessage);
        return "created!"
    } catch (e) {
        console.log(e);
    }
};

async function findMessages(user: userType) {
    try {
        const database = await db;
        const query = {
            $or: [
                { to: user },
                { from: user },
                { type: { $in: ["message", "status"] } }
            ]
        };

        const messages = await database.collection("messages").find(query).toArray();
        return messages
    } catch (e) {
        console.log(e);
    };
};

async function createEnterMessage(name: userType) {
    try {
        const database = await db;
        await database.collection("messages").insertOne({
            from: name,
            to: 'Todos',
            text: 'entra na sala...',
            type: 'status',
            time: dayjs().format('HH:mm:ss')
        });

        return "Message was created!"
    } catch (e) {
        return {
            error: e,
            message: "message was not created!"
        };
    }

};

async function findMessageById(id: string) {
    try {
        const database = await db;
        const existMessage = await database.collection("messages").findOne({ _id: new ObjectId(id) });
        return existMessage;
    } catch (e) {
        return {
            error: e,
            message: "message was not found"
        };
    }
};

async function deleteMessageById(id: any) {
    const database = await db;
    try {
        await database.collection("messages").deleteOne({ _id: new ObjectId(id) });
    } catch (e) {
        return {
            error: e,
            message: "message cannot be deleted!"
        }
    };
};

async function modernizeMessage(newMessage: any, id: string) {
    const database = await db;
    try {
        await database.collection("messages").updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...newMessage } }
        )
    } catch (e) {
        return {
            error: e,
            message: "message cannot be edited!"
        }
    }
}

export default {
    createMessage,
    findMessages,
    createEnterMessage,
    findMessageById,
    deleteMessageById,
    modernizeMessage
}