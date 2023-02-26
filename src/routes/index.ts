import Router from "express";
import participantRouter from "./participantRouter.js";

const router = Router();

router.use(participantRouter);

export default router;