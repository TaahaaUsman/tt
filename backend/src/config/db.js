import mongoose from "mongoose";

let cached = globalThis.mongoose;
if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

const connectToDatabase = async () => {
  if (cached.conn) {
    console.log("✅ Using existing DB connection");
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, { bufferCommands: false })
      .then((m) => {
        console.log("✅ New DB connection established");
        return m;
      })
      .catch((err) => {
        console.error("❌ DB connection error:", err);
        throw err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectToDatabase;
