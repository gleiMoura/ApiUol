import { Router } from "express";
import schemaValidator from "../middlewares/schemaValidator.js";
import messageSchema from "../schemas/messageSchema.js";
import { createMessage, getAllMessages } from "../controllers/messageController.js";

const messagesRouter = Router();

messagesRouter.post("/messages", schemaValidator(messageSchema), createMessage);
messagesRouter.get("/messages", getAllMessages);

export default messagesRouter;