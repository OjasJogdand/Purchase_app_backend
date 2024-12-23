import express from "express";
import adminMiddleware from "../middleware/admin.js";
import { admin,user,course } from "../db/index.js";
import jwt from "jsonwebtoken";
import jwtpassword from "../jwt.js";


const router=express.Router();
router.post("/signup",async function(req,res){
  
    const username=req.body.username;
    const password=req.body.password;
    await admin.create({username:username,password:password});
    res.json({msg:"admin created"});
}); 
router.post("/signin",async function(req,res){
   const username=req.body.username;
   const password=req.body.password;
   const a= await admin.findOne({username:username,password:password})
   if(a)
   {
   const token=jwt.sign({username:username},jwtpassword);
   res.json({token:token});
   }
   else
   {
    res.json({msg:"invalid username or password"});
   }
});
router.post("/courses",adminMiddleware,async function(req,res){
  
    const a=await course.create({title:req.body.title,description:req.body.description,imageLink:req.body.imageLink,price:req.body.price});
    res.json({msg:"posted courses",courseid:a._id});
});
router.get("/courses",adminMiddleware,async function(req,res){
    const a= await course.find({});
    res.json(a);
});
export default router;