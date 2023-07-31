import bcrypt, { compare } from "bcrypt";
import UserModel from "../models/UserMode.js";
import genAuthToken from "../utils/genAuthToken.js";

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const exits = await UserModel.findOne({ email: email });
    if (exits) return res.status(403).json("User already exits");
    const salt = await bcrypt.genSalt(12);
    const hasedPassword = await bcrypt.hash(password, salt);

    const Reg = new UserModel({
      name: name,
      email: email,
      username: username,
      password: hasedPassword,
    });
    const user = await Reg.save();
    const token = genAuthToken(user);
    res.status(201).json(token);
  } catch (error) {
    console.log({ error: error.message });
    return res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username });
    if (!user) return res.status(404).json("User not found");
    const ismatched = await compare(password, user.password);
    if (!ismatched) return res.status(403).json("Invalid password");
    const token = genAuthToken(user);
    res.status(200).json(token);
  } catch (error) {
    console.log({ error: error.message });
    return res.status(500).json({ error: error.message });
  }
};
