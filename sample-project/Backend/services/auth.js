import jwt from "jsonwebtoken"
import 'dotenv/config'; 

export const createTokenForUser = (user)=> {
    return jwt.sign({_id:user._id,
        email:user.email,
        fullName:user.fullName,
    },process.env.JWT_SECRET)
}


export const validateTokenForUser = (token) =>{
    if(!token) return null;
    try{
        return jwt.verify(token,secretKey)
    }catch{
        throw new Error("cant verify the token");
    }
}

