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
        $set: {
            name,
            lastStatus: Date.now()
        }
    };

    try {
        const database = await db;
        const participant = await database.collection("participants").findOneAndUpdate({ name }, update, { returnDocument: 'after' });
        return participant;
    } catch (e) {
        return {
            error: e,
            message: "participant was not found!"
        };
    };
}

async function deleteParticipant() {
    const database = await db;
    const secondsAgo = Date.now() - (30 * 1000);

    try {
        const peopleToDelete = await database.collection("participants").find({ lastStatus: { $lt: secondsAgo } }).toArray();

        const exitMessages = peopleToDelete.map(person => {
            return (
                { from: person.name, to: 'Todos', text: 'sai da sala...', type: 'status', time: dayjs().format('HH:mm:ss') }
            )
        });

        await database.collection("participants").deleteMany({ lastStatus: { $lt: secondsAgo } }) // It means less than

        await database.collection("messages").insertMany(exitMessages);
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
    findAllParticipants,
    updateParticipant,
    deleteParticipant
};



