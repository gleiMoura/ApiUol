import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import router from "./routes/index.js";
import errorHandler from "./middlewares/errorValidator.js";
import participantService from "services/participantService.js";

const repeatedFunction = participantService.removeParticipant;

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);

repeatedFunction();

export default app;
