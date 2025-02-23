const express=require("express");
const app=express();
import { cloudinaryConnect } from "./config/cloudinary";
const dbConnect = require("./config/databse");

require("dotenv").config();
const PORT=process.env.PORT || 4000;


app.use(express.json());


const userRoutes = require("./routes/user");

app.use("/api/v1",userRoutes);


app.listen(PORT,()=>{
    console.log(`server started successfully at ${PORT}`);
})

//cloudinary connect
cloudinaryConnect();

dbConnect();


app.get("/",(req,res)=>{
    res.send(`<h1> this is HOMEPAGE baby</h1>`);
})