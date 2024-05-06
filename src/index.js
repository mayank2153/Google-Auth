// require('dotenv').config()
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { User } from "./models/user.model.js";
import passport from "passport";


dotenv.config({
    path: "./env"
});
connectDB().then(
    ()=>{
        app.listen(process.env.PORT || 8000,()=>{
            console.log(" Server is running at ",process.env.PORT)
        })
    }
).catch(
    (err)=>{
        console.log("MongoDB connection failed",err)
    }
)
app.get("/",(req,res)=>{
    res.send("Hello World2")
})