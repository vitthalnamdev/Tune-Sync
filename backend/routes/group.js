const express = require("express");
const router = express.Router();

const {
    findUserGroupById,
    findAllGroups,
    createGroup
} = require("../controllers/GroupControllers");

router.post("/get_user_group",findUserGroupById);
router.post("/get_all_group",findAllGroups);
router.post("/create_group",createGroup);

module.exports = router;
