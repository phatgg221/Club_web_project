// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri ="mongodb+srv://club_web:1234@cluster0.bkkzkne.mongodb.net/?retryWrites=true&w=majority";
// const options = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// };

let client;
let clientPromise;

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your Mongo URI to .env.local');
// }

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
    console.log("Mongodb connected successfully: "+ uri);
  }
  clientPromise = global._mongoClientPromise;
} else {

  client = new MongoClient(uri);
  clientPromise = client.connect();
  console.log("Mongodb connected successfully: "+ uri);
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
