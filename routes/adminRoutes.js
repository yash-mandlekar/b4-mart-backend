const express = require("express");
const router = express.Router();
const {
  login,
  add_product,
  all_product,
  update_product,
  delete_product,
  all_orders,
  product_data,
  upgrade_role,
  create_shop,
  all_shop,
  delete_shop,
  all_user,
  delete_user,
} = require("../controller/shopController");

// Authentication
router
  .post("/shop", create_shop)
  .get("/shop", all_shop)
  .delete("/shop/:id", delete_shop);

router.post("/login", login);

router.post("/upgrade", upgrade_role);
router.post("/many-data", product_data);

// User CRUD Routes
router.get("/user", all_user).delete("/user/:id", delete_user);

// Product CRUD Routes
router
  .post("/product", add_product)
  .get("/product", all_product)
  .put("/product/:id", update_product)
  .delete("/product/:id", delete_product);

// Orders Routes
router.get("/orders", all_orders);

module.exports = router;
