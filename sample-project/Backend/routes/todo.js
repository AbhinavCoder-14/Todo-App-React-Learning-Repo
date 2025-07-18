import express from "express";

import { Todo } from "../models/todo.js";
import {User} from "../models/user.js"
import { restrictTo } from "../middlewares/auth.js";

export const todoRoutes = express.Router();

todoRoutes.post("/create",restrictTo(),async (req,res)=>{

    try{
        console.log("enterd on create of todo")
        const {todoName,category,priority,completed} = req.body
        const createdBy = req.user._id
        const todo = await Todo.create({todoName,completed,priority,category,createdBy})
        res.status(201).json({status:"Todo created in db"})
    }
        catch(error){
        res.status(400).json({status:"Error occuring in todo creation"})
    }

})


todoRoutes.get("/fetch",restrictTo(),async(req,res)=>{
    try{
        // const todo = await Todo.find({createdBy:req.user._id})
        const todo = await Todo.find({createdBy:req.user._id})
        const user = await User.find({email: req.user.email})
        // return todo
        res.status(201).json({todo})
    }

    catch(error){
        console.log(error)
        res.status(401).json({status:"Todo Fetch failed"})
    }
})



todoRoutes.put("/update/:id",async(req,res)=>{
    try{
        const todo = await Todo.findOneAndUpdate(req.params.id,req.body)
        res.status(201).json({stauts:"Todo updated successfull"})
    }

    catch(error){
        console.log(error)
        res.status(401).json({status:"Todo update failed"})
    }
})


todoRoutes.delete("/delete/:id",async(req,res)=>{
    try{
        await Todo.findByIdAndDelete(req.params.id)
        res.status(201).json({stauts:"Todo deleted successfull"})
    }

    catch(error){
        console.log(error)
        res.status(400).json({status:"Todo deletion failed"})
    }
})