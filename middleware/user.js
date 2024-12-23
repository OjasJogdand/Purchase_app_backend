import jwt from "jsonwebtoken";
import jwtpassword from "../jwt.js";

function userMiddleware(req,res,next)
{
    const a=req.headers.authorization;
    const token=a.split(" ");
    const token1=a[1];
    
    const decoded=jwt.verify(token1,jwtpassword);
    if(decoded.username)
    {
        req.body.username=decoded.username;
       next();
    }
    else{
        res.json({msg:"verification failed"});
    }
}