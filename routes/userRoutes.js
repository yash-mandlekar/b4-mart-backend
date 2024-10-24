const express = require("express");
const {
  signup,
  login,
  profileupdate,
  search_product,
  add_cart,
  get_address,
  deleteCollection,
  verifyotp,
  logout,
  getUserDetails,
  single_product,
  remove_cart,
  create_order,
  user_order,
  payment_gateway,
} = require("../controller/userController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

// GET
router.get("/me", isAuthenticated, getUserDetails);
router.get("/logout", logout);
router.get("/delete", deleteCollection);
router.get("/singleproduct/:id", single_product);
router.get("/product/:name", search_product);
router.get("/search", search_product);
router.get("/payment_gateway",isAuthenticated, payment_gateway);
router.get("/user_order",isAuthenticated, user_order);


// PUT
router.put("/profileupdate",isAuthenticated, profileupdate);
router.put("/get_address", get_address);

// POST
router.post("/login", login);
router.post("/otp", verifyotp);
router.post("/add_cart/:id", isAuthenticated, add_cart);
router.post("/remove_cart/:id", isAuthenticated, remove_cart);
router.post("/create_order",isAuthenticated, create_order);

module.exports = router;
