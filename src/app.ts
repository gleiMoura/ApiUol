import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import router from "./routes/index";
import errorHandler from "./middlewares/errorValidator";
import participantService from "./services/participantService";

const repeatedFunction = participantService.removeParticipant;

const app = express();

app.use(cors({
    origin: 'https://frontuol.onrender.com'
}));

app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', 'https://frontuol.onrender.com');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        return res.status(200).json({});
    }
    next();
});

app.use(json());
app.use(router);
app.use(errorHandler);

repeatedFunction();

export default app;
