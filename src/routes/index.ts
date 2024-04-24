import Router from "express";
import participantRouter from "./participantRouter.js";
import messagesRouter from "./messagesRouter.js"
import statusRouter from "./statusRouter.js";

const router = Router();

router.use(participantRouter);
router.use(messagesRouter);
router.use(statusRouter)

export default router;