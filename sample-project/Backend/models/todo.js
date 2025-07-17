import mongoose from "mongoose";




const todoSchema = new mongoose.Schema({
    todoName:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        required:true,
        default:false
    },
    priority:{

        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },

    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    }

},{timestamps:true})



export const Todo = mongoose.model('Todo',todoSchema)