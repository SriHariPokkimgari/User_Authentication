import User from "../models/User.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import nodemailer from "nodemailer";

dotenv.config();

//@ Signup router Logic using POST method
export const CreateUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({
      email,
      password,
    });
    const userExists = await User.find({ email });
    if (userExists.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }
    await user.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

//@ Login router Logic using POST method
export const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

//@ Get Profile Logic using GET method
export const GetProfile = async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "Protected route accessed", user });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

//@ Forgot password and Send a link to reset password via email Logic using POST method
export const ForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    //Create reset token (valid for 1 hour)
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    //Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.
       If you didn't generate this password reset link , someone else might be using your account. Check and secure your account now.</p>`,
    });

    res.json({ message: "Reset link sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server  error" });
  }
};

//@ Reset password Logic using POST method
export const ResetPassword = async (req, res) => {
  const { password, token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    //Check previous password and password is same or not
    const prevPassword = await bcrypt.compare(password, user.password);
    if (prevPassword) {
      return res.status(400).json({ error: "try another password" });
    }
    //Update the user's password
    user.password = password;
    await user.save();
    res.status(200).json({ message: "sucessfully reset" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(400)
        .json({ error: "Reset link expired. Please request a new one." });
    }
    res.status(400).json({ error: "Invalid or expired token" });
  }
};
