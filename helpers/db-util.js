import { MongoClient } from 'mongodb';

////////// Connect to DB function
export async function connectDB() {
  const client = await MongoClient.connect(
    'mongodb+srv://marius:190792@cluster0.gc9c1.mongodb.net/testdb?retryWrites=true&w=majority'
  );

  return client;
}

/////// Insert document to DB
export async function insertDocument(client, collection, document) {
  await client.db('testdb').collection(collection).insertOne(document);
}

///// Get document from DB
export async function getDocument(client, collection) {
  const comments = await client
    .db('testdb')
    .collection(collection)
    .find()
    .sort({ _id: -1 })
    .toArray();
  return comments;
}
