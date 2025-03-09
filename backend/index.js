const express=require("express");
const app=express();
<<<<<<< HEAD
const {cloudinaryConnect} = require("./config/cloudinary");
const dbConnect = require("./config/databse");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
=======
// import { cloudinaryConnect } from "./config/cloudinary";
// const dbConnect = require("./config/databse");
>>>>>>> main

require("dotenv").config();
const PORT=process.env.PORT || 4000;


app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
         tempFileDir : '/tmp/'
    })
)

const userRoutes = require("./routes/user");

<<<<<<< HEAD
app.use("/api/v1/auth",userRoutes);
=======
// app.use("/api/v1",userRoutes);



//cloudinary connect
// cloudinaryConnect();

// dbConnect();


app.get("/home" , (req , res)=>{
    
})

app.get("/",(req,res)=>{
    res.send(`<h1> this is HOMEPAGE baby</h1>`);
})
>>>>>>> main


app.listen(PORT,()=>{
    console.log(`server started successfully at ${PORT}`);
});