import { MongoClient } from "mongodb";
import dotenv from "dotenv";

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: '.env.development' })
}

const Client = process.env.MONGO_URL + '?ssl=true&tlsAllowInvalidCertificates=true';

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
