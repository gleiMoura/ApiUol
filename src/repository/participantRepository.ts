import db from "../config/index";
import dayjs from "dayjs";
import { userType } from "../interfaces/index";

async function findParticipant(name: userType) {
    const participant = await db.collection('participants').findOne({ name });
    return participant;
};

async function createParticipant(name: userType) {
    await db.collection("participants").insertOne({
        name,
        lastStatus: Date.now()
    });
    return "created"
};

async function createEnterMessage(name: userType) {
    try {
        await db.collection("messages").insertOne({
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
        const participants = await db.collection("participants").find({}).toArray();
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
        const participant = await db.collection("participant").findOneAndUpdate({ name }, update, { returnOriginal: false });
        return participant;
    } catch (e) {
        return {
            error: e,
            message: "participant was not found!"
        };
    };
}

export default {
    findParticipant,
    createParticipant,
    createEnterMessage,
    findAllParticipants,
    updateParticipant
};



