import express from "express";
import bcrypt from "bcrypt";

import { User } from "../models/user.js";
import { createTokenForUser } from "../services/auth.js";

export const userRoutes = express.Router();

userRoutes.get("/signup", (req, res) => {
  res.send({ page: "sign up page" });
});

userRoutes.post("/signup", async (req, res) => {
  try {
    const { fullName, password, email } = req.body;

    const user = new User({ fullName, password, email });
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    return res.status(201).json({
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      error:err,
    });
  }
});

userRoutes.get("/login", (req, res) => {
  res.send({ page: "login page" });
});

userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(403).json({
      message: "wrong email or password",
    });

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect)
    return res.status(403).json({
      message: "wrong email or password",
    });

  const token = createTokenForUser(user);
  res.cookie("token", token,{
    
    httpOnly: true,
    secure: true, // set to true in production (HTTPS)
    sameSite: "none", // or "none" if cross-domain and using HTTPS
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    path: "/",
  });
  return res.status(200).json({ status: "success",token:token});

});

userRoutes.post("/logout", (req, res) => {
  res.clearCookie("token");
});
