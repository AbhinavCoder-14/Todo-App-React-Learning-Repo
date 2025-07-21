import { validateTokenForUser } from "../services/auth.js";
import cookieParser from "cookie-parser";

export const checkForAuthCookie = (cookieName) => {
    return (req, res, next) => {
        console.log("entered in middleware");
        let token = req.cookies[cookieName]; // Check cookie first

        // If no token in cookie, check Authorization header
        if (!token && req.headers.authorization) {
            // Extract token from "Bearer <token>" format
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            }
        }

        if (!token) {
            return next(); // No token found, proceed (restrictTo will handle 401 if needed)
        }

        try {
            const userPayload = validateTokenForUser(token);
            req.user = userPayload; // Attach user payload to request
        } catch (error) {
            console.error("Token verification failed:", error.message);
            // Optionally clear the invalid cookie if it exists
            if (req.cookies[cookieName]) {
                res.clearCookie(cookieName);
            }
            return next(); // Token invalid, proceed but req.user will be null/undefined
        }
        next();
    };
};

export const restrictTo = () => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ status: "Authentication required" });
            res.redirect()
        }
        return next()
    }
}