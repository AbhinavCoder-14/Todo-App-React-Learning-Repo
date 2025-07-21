import express from "express"
import 'dotenv/config'; 
import path from "path"
import cors from "cors"
import cookieParser from "cookie-parser";

import  { userRoutes }  from "./routes/user.js";
import { DbConnect } from "./db/connect.js";
import { todoRoutes } from "./routes/todo.js";
import { checkForAuthCookie, restrictTo } from "./middlewares/auth.js";




const app = express()
const PORT = process.env.PORT || 8001

DbConnect(process.env.MONGO_URL).then(()=>{
    console.log("Db connected")
}).catch((error)=> console.log("db connection error",error))
// DbConnect("mongodb://127.0.0.1:27017/todo-app").then(()=>{
//     console.log("Db connected")
// }).catch((error)=> console.log("db connection error",error))


app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"] // Corrected: "Authorization"
}))

app.use(checkForAuthCookie("token"))









app.get("/",restrictTo(),(req,res)=>{
    console.log("all set")
    res.send({response:"All Set"})
})


app.use("/user",userRoutes)

app.use("/todo",todoRoutes)








app.listen(PORT,()=>{
    console.log("Server is listening at 8k Port")
})



