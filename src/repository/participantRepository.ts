import db from "../config/index";
import dayjs from "dayjs";
import { userType } from "../interfaces/index";

async function findParticipant(name: userType) {
    const database = await db;
    const participant = await database.collection('participants').findOne({ name });
    return participant;
};

async function createParticipant(name: userType) {
    const database = await db;
    await database.collection("participants").insertOne({
        name,
        lastStatus: Date.now()
    });
    return "created"
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

async function findAllParticipants() {
    try {
        const database = await db;
        const participants = await database.collection("participants").find({}).toArray();
        return participants;
    } catch (e) {
        return {
            error: e,
            message: "participants were not found!"
        };
    };
};

async function updateParticipant(name: userType) {
    const update = {
        name,
        lastStatus: Date.now()
    };

    try {
        const database = await db;
        const participant = await database.collection("participant").findOneAndUpdate({ name }, update);
        return participant;
    } catch (e) {
        return {
            error: e,
            message: "participant was not found!"
        };
    };
}

async function deleteParticipant() {
    try {
        const database = await db;
        const SecondsAgo = Date.now() - (10 * 1000);

        await database.collection("participants").deleteMany({ lastStatus: SecondsAgo })
    } catch (e) {
        return {
            error: e,
            message: "participant was not found!"
        };
    }
}

export default {
    findParticipant,
    createParticipant,
    createEnterMessage,
    findAllParticipants,
    updateParticipant,
    deleteParticipant
};



