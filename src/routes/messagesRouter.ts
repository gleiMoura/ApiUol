import schemaValidator from "../middlewares/schemaValidator.js";
import messageSchema from "../schemas/messageSchema.js";
import { Router } from "express";
import {
    createMessage,
    getAllMessages,
    removeMessage,
    changeMessage
} from "../controllers/messageController.js";

const messagesRouter = Router();

messagesRouter.post("/messages", schemaValidator(messageSchema), createMessage);
messagesRouter.get("/messages", getAllMessages);
messagesRouter.delete("/messages/:id", removeMessage);
messagesRouter.put("/messages/:id", schemaValidator(messageSchema), changeMessage);

export default messagesRouter;