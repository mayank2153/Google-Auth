import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport"; // Import Passport.js

import "./auth/auth.js";

const app = express();

// Session Setup
app.use(
  session({
    secret: "mayank",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRoutes from "./routes/user.routes.js";
app.use(userRoutes);

export { app };
