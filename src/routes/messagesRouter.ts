import schemaValidator from "../middlewares/schemaValidator";
import messageSchema from "../schemas/messageSchema";
import { Router } from "express";
import {
    createMessage,
    getAllMessages,
    removeMessage,
    changeMessage
} from "../controllers/messageController";

const messagesRouter = Router();

messagesRouter.post("/messages", schemaValidator(messageSchema), createMessage);
messagesRouter.get("/messages", getAllMessages);
messagesRouter.delete("/messages/:id", removeMessage);
messagesRouter.put("/messages/:id", schemaValidator(messageSchema), changeMessage);

export default messagesRouter;