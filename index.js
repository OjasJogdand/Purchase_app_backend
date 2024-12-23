import express from "express";
import bodyParser from "body-parser";
const app=express();
import adminrouter from "./routes/admin.js";
import userrouter from "./routes/user.js";

app.use(bodyParser.json());
app.use("/admin",adminrouter);
app.use("/user",userrouter);

app.listen(3000,function(){
    console.log("listening on port 3000");
});