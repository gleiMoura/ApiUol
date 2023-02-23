import app from "./app.js";
import chalk from "chalk";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

let database;
dotenv.config();
const mongoClient = new MongoClient(process.env.MONGO_URL || "mongodb://localhost:27017");

const promise = mongoClient.connect();

promise.then( () => {
    database = mongoClient.db(process.env.DATABASE);
    console.log(chalk.blue.bold("DB is connected!"));
}).catch( err => {
    console.log(chalk.red.bold("Conection faild at DB. error message: ", err));
});

app.listen(5000, () => {
    console.log("Server is running!");
})
