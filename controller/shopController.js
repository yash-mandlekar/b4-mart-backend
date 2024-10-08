const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const { sendtoken } = require("../utils/sendToken");
const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
// const data = require("../data.json");

exports.create_shop = async (req, res) => {
  try {
    const user = await userModel.findOne({ contact: req.body.contact });
    if (user) {
      return res.status(200).send("User already exists");
    }
    const newuser = await userModel.create(req.body);
    newuser.role = "shop";
    await newuser.save();
    res.status(201).json({ message: "Shop created successfully" });
  } catch (err) {
    res.status(401).json({ messege: err });
  }
};

exports.all_shop = catchAsyncErrors(async (req, res) => {
  const shops = await userModel.find({ role: "shop" });
  res.json({ message: "All Shops", shops });
});

exports.login = async (req, res) => {
  try {
    const { contact, password } = req.body;

    const user = await userModel
      .findOne({ contact: contact })
      .select("+password");

    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.role == "shop" || user.role == "admin") {
      const isMatch = user.comparepassword(password);

      if (!isMatch)
        return res.status(401).json({
          success: false,
          message: "Enter Correct Number and Password",
        });

      sendtoken({ message: "Logged in successfully" }, user, 200, res);
    } else {
      res.json({ message: "You didn't have access the resources" });
    }
  } catch (err) {
    res.json({ message: err });
  }
};

exports.upgrade_role = async (req, res) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { _id: req.body.id },
      { role: "shop" }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.product_data = async (req, res) => {
  try {
    const products = await productModel.insertMany(data);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.add_product = async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json({ message: "Created Product", product: product });
  } catch (err) {
    res.status(400).json({ message: err.message }); // Use 400 for validation errs
  }
};

exports.all_product = async (req, res) => {
  try {
    const products = await productModel.find().populate("shop_id"); // Use plural 'products'
    res.status(200).json({
      message: "All Products",
      count: products.length,
      products: products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update_product = async (req, res) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ); // Use findByIdAndUpdate for updates
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete_product = async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.all_orders = async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json({ message: "Created Product", product: product });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
