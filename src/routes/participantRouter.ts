import Router from "express";
import schemaValidator from "../middlewares/schemaValidator.js";
import participantSchema from "../schemas/participantSchema.js";
import { createRegister } from "../controllers/participantController.js";

const participantRouter = Router();

participantRouter.post("/participants",schemaValidator(participantSchema), createRegister);

export default participantRouter;