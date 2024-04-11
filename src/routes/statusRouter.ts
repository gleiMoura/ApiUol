import { Router } from "express";
import { updateParticipant } from "controllers/statusController";

const statusRouter = Router();

statusRouter.post("/status", updateParticipant);

export default statusRouter;
