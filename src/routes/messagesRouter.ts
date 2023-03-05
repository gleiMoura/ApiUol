import Router from "express";
import schemaValidator from "../middlewares/schemaValidator";

const messageRouter = Router();

messageRouter.post("/message", schemaValidator(), createMessage);