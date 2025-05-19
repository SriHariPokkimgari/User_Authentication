import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

import validator from "validator";
const { isEmail } = validator;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,

    minlength: [6, "Password must be at least 6 characters long"],
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
});

//Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = model("User", userSchema);
export default User;
