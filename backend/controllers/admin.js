const { validateEmail } = require("../helpers/validation");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/token");

exports.admin_login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "invalid email address" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Only admin can join" });
    }
    const check = await bcrypt.compare(password, admin.password);
    if (!check) {
      return res
        .status(400)
        .json({ message: "Invalid credentials.Please try again" });
    }

    const token = generateToken({ id: admin._id.toString() }, "7d");
    res.send({
      id: admin._id,
      email: admin.email,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
