import {validateTokenForUser} from "../services/auth.js"
import cookieParser from "cookie-parser"



export const checkForAuthCookie = (cookieName) =>{
    return (req,res,next) =>{
        const tokenCookieValue = req.cookies[cookieName]
        
        if (!tokenCookieValue) return next()
        try{
            const userPayload = validateTokenForUser(tokenCookieValue)
            req.user = userPayload
        }

        catch(error){
            return next()
        }

    }
}


export const restrictTo= ()=>{
    return (req,res,next)=>{
        if(!req.user) return res.redirect("/user/login");

        return next()
    }
}