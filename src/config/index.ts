import {MongoClient} from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

let db;

try {
  const mongoClient = new MongoClient(process.env.MONGO_URL || "");
  await mongoClient.connect();
  db = mongoClient.db(process.env.BANCO);
  console.log(chalk.blue.bold("Database is connected!"));
} catch(e) {
  console.log(chalk.red.bold("Error in database: "), e);
}

export default db;