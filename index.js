import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { ConnectDB } from "./utils/ConnectDB.js";
import AuthRoute from "./routes/Auth.js";
import UserRoute from "./routes/User.js";
import PostRoute from "./routes/Post.js";
import ChatRoute from "./routes/Chat.js";
import MessageRoute from "./routes/Message.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json({ limit: "80mb" }));
app.use(bodyParser.json({ limit: "80mb" }));
app.use(bodyParser.urlencoded({ limit: "80mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome Home");
  console.log("Welcome Home");
});

app.use("/auth", AuthRoute);
app.use("/users", UserRoute);
app.use("/posts", PostRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
ConnectDB();
