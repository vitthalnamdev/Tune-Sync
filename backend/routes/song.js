const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
    autoSuggetion,
    getSong
    
  } = require("../controllers/SongControllers");

  // Route for auto suggestion 
router.get("/autosuggestion",autoSuggetion);
router.get("/song/:id",getSong);


module.exports = router;