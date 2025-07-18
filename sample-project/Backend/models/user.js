 import mongoose from "mongoose";
import { error } from "node:console";
import {createHmac, randomBytes} from "node:crypto"


import { create } from "node:domain";
// import  userRoutes  from "../routes/user.js";




const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

    salt:{
        type:String,
    },

},{timestamps:true})

    






userSchema.pre("save",function(next){
    const user = this;
    if (!user.isModified("password")) return next();
    
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256",salt).update(user.password).digest('hex')
    
    this.salt = salt;
    this.password = hashedPassword;
    return next();  
})


userSchema.static("matchPassword", async function (email,password) {
    const user = await this.findOne({email})
    if(!user) return false;

    const salt = user.salt
    const hashedPassword = user.password
    const userProvidedHashPass = createHmac("sha256",salt).update(password).digest("hex")

    if(hashedPassword!=userProvidedHashPass) return false;

    return user;
})



export const User = mongoose.model('user',userSchema)