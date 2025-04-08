const express = require("express");
const router = express.Router();

const {
    findUserGroupById,
    findAllGroups,
    createGroup,
    exitGroup,
    deleteGroup
} = require("../controllers/GroupControllers");

const auth = require("../middlewares/auth");

router.post("/get_user_group",findUserGroupById);
router.post("/get_all_group",findAllGroups);
router.post("/create_group",createGroup);
router.post('/exit-group',auth, exitGroup);
router.post("/delete_group",auth,deleteGroup);

module.exports = router;
