import Router from "express";
import schemaValidator from "../middlewares/schemaValidator";
import participantSchema from "../schemas/participantSchema";
import { createRegister } from "../controllers/participantController";

const participantRouter = Router();

participantRouter.post("/participants",schemaValidator(participantSchema), createRegister);

export default participantRouter;