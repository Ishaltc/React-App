const express = require('express');
const { admin_login } = require('../controllers/admin');
const router= express.Router()

router.post("/admin-login",admin_login)
module.exports = router;