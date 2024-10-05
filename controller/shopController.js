const productSchema = require("../models/productModel");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserdataSchema.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.status(404).send("user not register");
    }
    const passwordCheck = await bcrypt.compare(password, user.hash);
    if (!passwordCheck) {
      return res.status(401).send("massege: password not match");
    }
    return res.status(201).send("massege: login sucessful");
  } catch (error) {
    console.log(error);
    res.status(500).json("massege: internal error");
  }
};

exports.add_product = async (req, res) => {
  try {
    const product = await productSchema.create(req.body);
    res.status(201).json({ message: "Created Product", product: product });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
exports.all_product = async (req, res) => {
  try {
    const product = await productSchema.create(req.body);
    res.status(201).json({ message: "Created Product", product: product });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
exports.update_product = async (req, res) => {
  try {
    const product = await productSchema.create(req.body);
    res.status(201).json({ message: "Created Product", product: product });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
exports.delete_product = async (req, res) => {
  try {
    const product = await productSchema.create(req.body);
    res.status(201).json({ message: "Created Product", product: product });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
exports.all_orders = async (req, res) => {
  try {
    const product = await productSchema.create(req.body);
    res.status(201).json({ message: "Created Product", product: product });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
