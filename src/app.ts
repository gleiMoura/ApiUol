import express, { json } from 'express';
import cors from 'cors';
import router from './routes/index.js';
import "express-async-errors";
import errorHandler from "./middlewares/errorValidator.js";

const app = express();
app.use(cors());
app.use(json());
app.use(errorHandler);
app.use(router);

export default app;