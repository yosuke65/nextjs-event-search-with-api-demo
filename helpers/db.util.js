import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://yosuke:yosuke@serverlessinstance0.lrxw0.mongodb.net/?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDocument(client, dbName, collection, document) {
  const db = await client.db(dbName);
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, dbName, collection, sort) {
  const db = await client.db( dbName);
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
}
