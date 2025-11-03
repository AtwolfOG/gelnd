import mongoose, { Mongoose } from "mongoose";

interface MongooseGlobalCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}
declare global {
  var mongoose: MongooseGlobalCache | undefined;
}
const URI: string | undefined =
  process.env.NODE_ENV === "development"
    ? "mongodb://localhost:27017/gelnd"
    : process.env.MONGO_URI;
// const URI: string | undefined = process.env.MONGO_URI;
let cached: MongooseGlobalCache | undefined = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
const opt = {
  bufferCommands: false,
  serverSelectionTimeoutMS: 7000,
  // autoIndex: true,
};

export async function connectDB(): Promise<Mongoose> {
  if (!URI) throw new Error("Define the mongodb uri in the .env file");
  if (cached?.conn) return cached.conn;
  if (!cached?.promise) {
    cached!.promise = mongoose.connect(URI, opt);
    mongoose.connection.on("open", () => {
      console.log("MongoDb connection open");
    });
    mongoose.connection.on("error", (err) => {
      console.log("MongoDb connection error:", err);
    });
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDb disconnnected");
    });
  }
  try {
    cached!.conn = await cached!.promise;
  } catch (err) {
    cached!.promise = null;
    throw err;
  }
  return cached!.conn;
}

export default connectDB;

// export default async function () {
//   try {
//     const uri = process.env.MONGO_URI;
//     if (uri) await mongoose.connect(uri);
//   } catch (err) {
//     console.error(err);
//   }
// }
