const User = require("../models/User");
const OTP = require("../models/OTP");
const optGenerator = require("otp-generator");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require("../utils/mailSender");




// send otp
exports.sendOTP = async (req,res)=>{
    try {
        //fatch email
        const {email} = req.body;
        
        //check if user already exist
        const checkUserExist = await User.findOne({email:email})
        // if user already exist than return a response
        
        if(checkUserExist){
            return res.json({
                success:false,
                message:"User already registered"
            });
        }

        //generate otp
        let otp = optGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("genereted opt: ",otp);

        //check unique opt or not
        let result = await OTP.findOne({otp: otp});

        while(result){
            otp = optGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result = await OTP.findOne({otp: opt});
        }

        const otpPayload = {email, otp};
        
        //create an entry for OTP 
        const optBody = await OTP.create(otpPayload);
        console.log(optBody);

        //return response successful
        res.status(200).json({
            success:true,
            message:"OTP Sent successfully",
            
        });

    } catch (error) {
        console.log("error while sending Otp" ,error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//signUp
exports.signUp = async (req,res)=>{
    try {
        //fatch data
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
        } = req.body;
        //validations
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.json({
                success:false,
                message:"All field are required"
            });
        }

        // check password and confirmPassword match or not
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"Password and ConfirmPassword value does not match ,please try again"
            })
        }

        // check user already exist or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({
                success:false,
                message:"User already exists"
            })
        }

        // Find most recent OTP stored for user
        const recentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("Recent OTP" ,recentOTP);
        //validate otp
        
        if(recentOTP.length===0){
            //otp not found in database
            return res.json({
                success:false,
                message:"OTP not Found"
            })
        }else if(otp !== recentOTP[0].otp){
            //invalide otp
            return res.json({
                success:false,
                message:"Invalid OTP",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password,10);

        

        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        //return res

        return res.status(200).json({
            success:true,
            message: "User is registered successfully ",
            user,
        })



    } catch (error) {
        console.log("Error while signUp :",error );
        return res.status(400).json({
            success:false,
            message:"Error occured while singUp ",
            error,
        })
    }
}

//login
exports.login = async (req,res)=>{
    try {
        //fetch data
        const {email,password} = req.body;
        //validation
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All field are required",
            });
        }

        //check if user exist or not
        const user = await User.findOne({email});

        if(!user){
            return res.json({
                success:false,
                message:"User is not registered"
            })
        }
        //verify password

        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"3d",
            });
            user.token = token;
            user.password = undefined;

            //Create Cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in successFully",
            })
        }
        else{
            return res.json({
                success:false,
                message:"Invalid Password"
            });
        }

        //generate JWT token
    } catch (error) {
        console.log("Error while login", error);
        return res.status(500).json({
            success:false,
            message:"Login failure ,please try again leter"
        });
    }
}
