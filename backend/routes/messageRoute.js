
const express = require("express")
const router = express.Router()

const { addMessage, getMessages,lastOnlineTime } = require("../controllers/messageController");

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages);
router.get("/lastOnline",lastOnlineTime);

module.exports = router;