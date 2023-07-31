import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB;
const options = {
  useNewUrlParser: true,
};

const connect = mongoose.connect(url, options);

export async function ConnectDB() {
  try {
    await connect;
    console.log("Connected to mongoDB 🔥");
  } catch (error) {
    console.log({ error: error.message });
  }
}
