const express = require("express");
const {
  signup,
  login,
  profileupdate,
  search_product,
  add_cart,
  get_address,
  deleteCollection,
  users,
  verifyotp,
  logout,
  getUserDetails
} = require("../controller/userController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

// GET
router.get("/users", isAuthenticated, users);
router.get("/delete", deleteCollection);
router.get("/logout", logout);
router.get("/me", isAuthenticated, getUserDetails);
router.get("/search_product/:name", search_product);

// PUT
router.put("/profileupdate", profileupdate);
router.put("/get_address", get_address);

// POST
router.post("/login", login);
router.post("/otp", verifyotp);
router.post("/add_cart", add_cart);

module.exports = router;
