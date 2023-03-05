import Router from "express";
import participantRouter from "./participantRouter.js";
import messagesRouter from "./messagesRouter.js"

const router = Router();

router.use(participantRouter);
router.use(messagesRouter);

export default router;