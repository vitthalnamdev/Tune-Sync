const express=require("express");
const app=express();
const {cloudinaryConnect} = require("./config/cloudinary");
const dbConnect = require("./config/databse");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

require("dotenv").config();
const PORT=process.env.PORT || 4000;

dbConnect();
app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use(
    fileUpload({
        useTempFiles:true,
         tempFileDir : '/tmp/'
    })
)

const userRoutes = require("./routes/user");
const songRoutes = require("./routes/song");
const friendRoutes = require("./routes/friends")

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/songs",songRoutes);
app.use("/api/v1/friend",friendRoutes);
// cloudinaryConnect();
dbConnect();
app.get("/" , (req , res)=>{
    res.send("Hello from server");
})
app.listen(PORT,()=>{
    console.log(`server started successfully at ${PORT}`);
});
