import {validateTokenForUser} from "../services/auth.js"
import cookieParser from "cookie-parser"



export const checkForAuthCookie = (cookieName) =>{
    return (req,res,next) =>{
        console.log("enterd in middleware")
        const tokenCookieValue = req.cookies[cookieName]
        
        if (!tokenCookieValue) return next()
        try{
            const userPayload = validateTokenForUser(tokenCookieValue)
            req.user = userPayload
        }

        catch(error){
            return next()
        }
        next()

    }
}


export const restrictTo = () => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ status: "Authentication required" });
        }
        return next()
    }
}