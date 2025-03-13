const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
    login,
    signUp,
    sendOTP,
    IsvalidOtp,
    IsValidEmail,
    IsValidUsername
} = require("../controllers/Auth");

  // Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)

router.post("/verifyotp", IsvalidOtp)

router.post("/validEmail" , IsValidEmail)

router.post("/validUsername" , IsValidUsername)
module.exports = router