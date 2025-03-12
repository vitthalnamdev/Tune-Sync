const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
// const mailSender = require("./utils/mailSender");
const otpTemplate = require("./mail/emailVerificationTemplate");
require("dotenv").config();

// These lines are commented out because they're unused and might be causing errors
// const { cloudinaryConnect } = require("./config/cloudinary");
// const dbConnect = require("./config/databse");
// const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());  // Enable JSON body parsing
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
);

const mailSender = async (email, title, body)=>{
    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from: 'Tune-Sync',
            to:`${email}`,
            subject: `${title}`,
            html: `${body}`
        })

        console.log(info);
        return info;
        
    } catch (error) {
        console.error(error);
    }
}




const sendOtpEmail = async (email, otp) => {
    const title = "OTP Verification Email";
    const body = otpTemplate(otp);  // Use the OTP template function
    console.log("Sending email to:", email, "Title:", title);

    try {
        const response = await mailSender(email, title, body);
        return response;
    } catch (error) {
        console.error("Error while sending OTP email:", error);
        throw error; // Rethrow error to be caught in the route handler
    }
};

// Using GET route with hardcoded email as requested
app.post("/send-email", async (req, res) => {
    try {
        const email = "vitthal7804@gmail.com";
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit OTP
        
        
        await sendOtpEmail(email, otp);
        
        res.status(200).json({ success: true, otp });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});


// Test Route
app.get("/", (req, res) => {
    res.send("Hello from backend");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
});