import Router from "express";
import participantRouter from "./participantRouter";
import messagesRouter from "./messagesRouter"
import statusRouter from "./statusRouter";

const router = Router();

router.use(participantRouter);
router.use(messagesRouter);
router.use(statusRouter)

export default router;