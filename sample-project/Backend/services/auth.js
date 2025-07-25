import jwt from "jsonwebtoken"
import 'dotenv/config'; 
const JWT_SECRET = "JustApieceofShit"
export const createTokenForUser = (user)=> {
    return jwt.sign({_id:user._id,
        email:user.email,
        fullName:user.fullName,
    },JWT_SECRET)
}


export const validateTokenForUser = (token) =>{
    if(!token) return null;
    try{
        return jwt.verify(token,JWT_SECRET)
    }catch{
        throw new Error("cant verify the token");
    }
}

