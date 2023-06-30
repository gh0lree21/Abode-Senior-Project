const { addMsg, getAllMessages } = require("../controllers/messagesController");

const router = require("express").Router();

router.post("/addmsg/", addMsg);
router.post("/getmsg/", getAllMessages);

module.exports = router;