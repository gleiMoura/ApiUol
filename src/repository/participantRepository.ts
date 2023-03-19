import db from "../config/index";
import dayjs from "dayjs";
import { userType } from "../interfaces/index";

export async function findParticipant(name: userType) {
    const participant = await db.collection('participants').findOne({ name });
    return participant;
};

export async function createParticipant(name: userType) {
    await db.collection("participants").insertOne({
        name,
        lastStatus: Date.now()
    });
    return "created"
};

export async function createEnterMessage(name: userType) {
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
            message: "messages was not created!"
        };
    }

};

export async function findAllParticipants() {
    try {
        const participants = await db.collection("participants").find({}).toArray();
        return participants;
    } catch (e) {
        return {
            error: e,
            message: "participants was not found!"
        };
    };

}

const participantRepository = {
    findParticipant,
    createParticipant,
    createEnterMessage,
    findAllParticipants
};

export default participantRepository;



