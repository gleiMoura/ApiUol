import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db;

async function init() {
  const mongoClient = new MongoClient(process.env.MONGO_URL || "");
  await mongoClient.connect();
  db = mongoClient.db(process.env.BANCO);
  console.log("Database is connected!");
};

try {
  init();
} catch (e) {
  console.log("Error in database: ", e);
}

export default db;