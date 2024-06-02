import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const Client = process.env.MONGO_URL ? process.env.MONGO_URL : process.env.MONGO_URL_DEV;

async function init() {
  const mongoClient = new MongoClient(Client);
  await mongoClient.connect();
  console.log("Database is connected!");
  const database = mongoClient.db(process.env.BANCO);

  await database.createCollection('messages');
  await database.createCollection('participants');

  return database;
}

const db = init();

export default db;
