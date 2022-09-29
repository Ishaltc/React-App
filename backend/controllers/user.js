const {
  validateEmail,
  validateLength,
  validUserName,
} = require("../helpers/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/token");
const { sentVerificationEmail } = require("../helpers/mailer");
const jwt = require("jsonwebtoken");
const { redis } = require("googleapis/build/src/apis/redis");

//register
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    //validations
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "invalid email address" });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res
        .status(400)
        .json({ message: "This email address is already being used" });
    }

    if (!validateLength(first_name, 4, 20)) {
      return res
        .status(400)
        .json({ message: "first name must between 4 and 20 characters" });
    }
    if (!validateLength(last_name, 4, 20)) {
      return res
        .status(400)
        .json({ message: "last name must between 4 and 20 characters" });
    }
    if (!validateLength(password, 6, 20)) {
      return res
        .status(400)
        .json({ message: "password must be atleast 6 characters" });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    const tempUsername = first_name + last_name;
    const newUsername = await validUserName(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sentVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      isBlocked: user.isBlocked,
      message: "Register success ! please activate your email to start",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

//activate account
exports.activateAccount = async (req, res) => {
  try {
    const validUser = req.user.id;
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);
    //it  means (validUser) if anyone get the activation link we have to make sure it's security,only user can active it
    if (validUser !== user.id) {
      return res.status(400).json({
        message: "You don't have the authorization to complete this operation",
      });
    }

    if (check.verified === true) {
      return res
        .status(400)
        .json({ message: "this email is already activated" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      res
        .status(200)
        .json({ message: "Account has been activated successfully" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "the email address you entered is not connected to account",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res
        .status(400)
        .json({ message: "Invalid credentials.Please try again" });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      isBlocked: user.isBlocked,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// exports.auth = (req, res) => {
//   console.log(req.user);
//   res.json("Welcome from auth");
// };

exports.sendVerification = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (user.verified === true) {
      return res.status(400).json({
        message: "This account is already activated.",
      });
    }
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sentVerificationEmail(user.email, user.first_name, url);
    return res
      .status(200)
      .json({ message: "Email verification link has been sent to your mail" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
