import mongoose from "mongoose";


export const DbConnect = async (url) =>{
    return mongoose.connect(url)
}