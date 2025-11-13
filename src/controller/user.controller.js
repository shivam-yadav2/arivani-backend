import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await User.create({ name, email, password });
  console.log(user);
  res.status(200).json({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    return res.status(400).json({ message: "User does not exists" });
  }

  const isValid = await isUserExist.checkPassword(password);

  // console.log(isValid)

  if (!isValid) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const accessToken = jwt.sign({
    id: isUserExist._id,
    name: isUserExist.name,
    email: isUserExist.email
  }, process.env.JWT_SECRET);

  console.log(accessToken);

  res.status(200).json({
    user: isUserExist,
    accessToken,
    message: "User Logged In SuccessFully",
  });
};

export { register, login };
