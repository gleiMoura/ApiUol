import db from "../config/index.js";
import dayjs from "dayjs";

export async function findParticpant (name: string) {
    const participant = await db.collection('participants').findOne({name});
    return participant;
};

export async function createParticipant(name: string) {
    await db.collection("participants").insertOne({
        name,
        lastStatus: Date.now()
    });
    return "created"
};

export async function createEnterMessage (name: string) {
    await db.collection("messages").insertOne({
        from: name,
        to: 'Todos',
        text: 'entra na sala...',
        type: 'status',
        time: dayjs().format('HH:mm:ss')
    });

    return "Message was created!"
};

export async function findAllParticipants() {
    const participants = await db.collection("participants").find({}).toArray();
    return participants;
}



