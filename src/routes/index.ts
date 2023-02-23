import Router from "express";
import participantRouter from "./participantRouter";

const router = Router();

router.use(participantRouter);

export default router;