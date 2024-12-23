import express from "express";
import userMiddleware from "../middleware/user.js";
import { admin,user,course } from "../db/index.js";
import jwt from "jsonwebtoken";
import jwtpassword from "../jwt.js";


const router=express.Router();
router.post("/signup",async function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    await user.create({username:username,password:password});
    res.json({msg:"user created"});
});
router.post("/signin",async function(req,res){
    const username=req.body.username;
   const password=req.body.password;
   const a= await user.findOne({username:username,password:password})
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
router.get("/courses",async function(req,res){
    const a=await course.find({});
    res.json({courses:a});
});
router.post("/courses/:courseId",userMiddleware,async function(req,res){
     const username=req.body.username;
     const courseid=req.params.courseId;
     await user.updateOne({username:username},{
        "$push":{
            purchasedCourses:courseid
        }
     });
     res.json({msg:"purchase complete"});
});
router.get("/purchasedCourses",userMiddleware,async function(req,res){
     const username=req.body.username;
     const a=await user.findOne({username:username});
     const courses=await course.find({
        _id:{
            "$in":a.purchasedCourses
        }
     });
     res.json({courses:courses});
});