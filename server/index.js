import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import router from "./routes/auth.js";
import session from "express-session";
import passport from "passport";
import "./passport.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware to allow CORS requests
// This is important for the frontend to communicate with the backend
app.use(
  cors({
    origin: "https://user-authentication-xjk8.onrender.com",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", router);
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running`);
});
