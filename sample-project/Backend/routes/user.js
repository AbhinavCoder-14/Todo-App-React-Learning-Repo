import express from "express";
import { User } from "../models/user.js";


import {createTokenForUser} from "../services/auth.js"


export const userRoutes = express.Router();

userRoutes.get("/signup", (req, res) => {
  res.send({ page: "sign up page" });
});

userRoutes.post("/signup", async (req, res) => {
  try {
    const { fullName, password, email } = req.body;

    const user = await User.create({ fullName, password, email });
    return res.send({ status: "sucses" });
  } catch (err) {
    console.error("can't register the user data");
  }
});


userRoutes.get("/login", (req, res) => {
  res.send({ page: "login page" });
});



userRoutes.post("/login", async (req, res) => {
    const {email, password} = req.body
    console.log(email,password)
    const user = await User.matchPassword(email,password)
    

    if(user){
      const token = createTokenForUser(user)
      res.cookie("token",token)
      return res.send({status:"succses"})
    }

    else{
      return res.send({status:"Incorrect username or password"});
    }

    // localStorage.setItem("token", token);

});


userRoutes.post("/logout",(req,res)=>{
  res.clearCookie("token")
})
