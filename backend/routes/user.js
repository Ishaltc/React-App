const express = require("express");
const { authUser } = require("../controllers/middlewares/auth");


const {
  register,
  activateAccount,
  login,
  sendVerification
} = require("../controllers/user");
const router = express.Router();

router.post("/register", register);
//here we have add authUser bcz we passing user token from frontend via header
router.post("/activate",authUser, activateAccount);
router.post("/login", login);
//make sure user is logged in (authUser)
router.post("/sendVerification",authUser,sendVerification)
                                                                                             

module.exports = router;
