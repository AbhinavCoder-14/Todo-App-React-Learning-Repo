import jwt from "jsonwebtoken"

const secretKey = 'JustApieceofShit'
export const createTokenForUser = (user)=> {
    return jwt.sign({_id:user._id,
        email:user.email,
        fullName:user.fullName,
    },secretKey)
}


export const validateTokenForUser = (token) =>{
    if(!token) return null;
    try{
        return jwt.verify(token,secretKey)
    }catch{
        throw new Error("cant verify the token");
    }
}

