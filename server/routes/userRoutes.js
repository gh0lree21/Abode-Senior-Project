const { register, login, setAvatar, getAllUsers, addContact, getUserContacts } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allusers/:id", getAllUsers);
router.get("/userContacts/:id", getUserContacts);
router.get("/addcontact/:id", addContact);

module.exports = router;