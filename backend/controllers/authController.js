import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// Admin Login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password)) && user.isAdmin) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid admin credentials" });
  }
};

// Create admin (run once)
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const adminExists = await User.findOne({ email });
  if (adminExists) {
    res.status(400).json({ message: "Admin already exists" });
    return;
  }

  const admin = await User.create({
    name,
    email,
    password,
    isAdmin: true,
  });

  res.status(201).json(admin);
};
