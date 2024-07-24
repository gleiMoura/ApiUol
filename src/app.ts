import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import router from "./routes/index";
import errorHandler from "./middlewares/errorValidator";
import participantService from "./services/participantService";

const repeatedFunction = participantService.removeParticipant;

const app = express();

app.use(cors({
    origin: "https://frontuol.onrender.com"
}));
app.use(json());
app.use(router);
app.use(errorHandler);

repeatedFunction();

export default app;
