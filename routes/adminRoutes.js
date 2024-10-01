const express = require("express");
const { admin_dashboard } = require("../controller/adminController");
const {isAuthenticated}= require("../middleware/auth.js");
const adminrouter = express.Router();

adminrouter.get("/",isAuthenticated, admin_dashboard);

module.exports = adminrouter;