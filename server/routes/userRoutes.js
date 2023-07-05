const { register, login, setAvatar, getAllUsers, editContacts } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allusers/:id", getAllUsers);
router.get("/contacts/:id", editContacts);

module.exports = router;