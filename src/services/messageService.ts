
import db from "../config/index.js";
import dayjs from "dayjs";
import { messageType } from "../interfaces/index.js";

export async function gatherDatas(data: messageType, user: string | string[] | undefined) {
    const participant = await db.collection("participants").findOne({name: user});

    if(!participant) {
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

    await db.collection("messages").insertOne({message: completeMessage});
}