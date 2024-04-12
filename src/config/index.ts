import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

async function init() {
  const mongoClient = new MongoClient(process.env.MONGO_URL || "");
  await mongoClient.connect();
  console.log("Database is connected!");
  return mongoClient.db(process.env.BANCO);
}

const db = init();

export default db;
