const express = require("express");
const shoprouter = express.Router();
const { product_add } = require("../controller/shopController");

shoprouter.post("/product_add", product_add);

module.exports = shoprouter;
