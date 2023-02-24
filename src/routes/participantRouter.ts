import Router from "express";
import schemaValidator from "../middlewares/schemaValidator";
import participantSchema from "../schemas/participantSchema";

const participantRouter = Router();

participantRouter.post("/participants",schemaValidator(participantSchema));

export default participantRouter;