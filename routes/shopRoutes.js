const express = require("express");
const router = express.Router();
const {
  login,
  add_product,
  all_product,
  update_product,
  delete_product,
  all_orders,
} = require("../controller/shopController");

// Authentication
router.post("/login", login);

// Product CRUD Routes
router
  .post("/product", add_product)
  .get("/product", all_product)
  .put("/product", update_product)
  .delete("/product", delete_product)
  .get("/product/:name", all_product);

// Orders Routes
router.get("/orders", all_orders);

module.exports = router;
