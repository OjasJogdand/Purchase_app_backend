import jwt from "jsonwebtoken";
import jwtpassword from "../jwt.js";

function adminMiddleware(req,res,next)
{
    const a=req.headers.authorization;
    const token=a.split(" ");
    const token1=token[1];

    console.log(token1);
    const decoded1 = jwt.decode(token1); // Decode without verifying
    console.log(decoded1);

    const decoded=jwt.verify(token1,jwtpassword);
    if(decoded.username)
    {
       next();
    }
    else{
        res.json({msg:"verification failed"});
    }
}
export default adminMiddleware;