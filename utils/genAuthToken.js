import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const genAuthToken = (user) => {
  const authKey = process.env.AUTH_SECRET;
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    },
    authKey
  );

  return token;
};

export default genAuthToken;
