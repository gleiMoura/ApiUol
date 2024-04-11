import { Router } from "express";

const statusRouter = Router();

statusRouter.post("/status", receiveUser);

export default statusRouter;
