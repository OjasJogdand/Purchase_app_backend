import mongoose from "mongoose";
import { type } from "os";
import { title } from "process";

mongoose.connect("mongodb+srv://Ojas:ppx8fiVtwtpRwBje@cluster0.u83xy.mongodb.net/Course_app");

const Adminschema=new mongoose.Schema({
    username:String,
    password:String,

});
const Userschema=new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
});
const Courseschema=new mongoose.Schema({
    title:String,
    description:String,
    imageLink:String,
    price:Number  
});

const admin=mongoose.model("Admin",Adminschema);
const user=mongoose.model("User",Userschema);
const course=mongoose.model("Course",Courseschema);

export {admin,user,course};