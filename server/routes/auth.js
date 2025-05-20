import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import {
  CreateUser,
  LoginUser,
  GetProfile,
  ForgotPassword,
  ResetPassword,
} from "../controllers/controler.js";

const router = Router();

//Signup Router
router.post("/signup", (req, res) => {
  CreateUser(req, res);
});

//Login router
router.post("/login", (req, res) => {
  LoginUser(req, res);
});

//Protected route
router.get("/protected", (req, res) => {
  GetProfile(req, res);
});

//Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.redirect(
      `https://user-authentication-xjk8.onrender.com/profile?token=${token}`
    );
  }
);

//Forgot password
router.post("/forgot-password", (req, res) => {
  ForgotPassword(req, res);
});

//reset pasword
router.post("/reset-password", async (req, res) => {
  ResetPassword(req, res);
});
export default router;
