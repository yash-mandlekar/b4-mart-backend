const UserSchema = require("../models/userModel");
const productdetails = require("../models/productModel");
const { sendtoken } = require("../utils/sendToken");
const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
// const bcrypt = require("bcrypt");
// const axios = require("axios");
// const fetch = require("node-fetch");

exports.users = async (req, res) => {
  const user = await UserSchema.find();
  res.json(user);
};
exports.deleteCollection = async (req, res) => {
  await UserSchema.deleteMany();
  const user = await UserSchema.find();
  res.json(user);
};

exports.signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    // Check if the user already exists
    const existingUser = await UserSchema.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User is already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10); // Use 10 rounds for hashing
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user instance
    const newUser = new UserSchema({
      username: username, // Using Username from the request
      email: email,
      hash: hashedPassword, // Save the hashed password
    });

    // Save user to the database
    const saveData = await newUser.save();
    console.log(saveData);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = catchAsyncErrors(async (req, res) => {
  const { contact, username } = req.body;
  const user = await UserSchema.findOne({ contact: contact });
  const otp = generateOTP();

  if (!user) {
    const newuser = await UserSchema.create({
      username: username,
      contact: contact,
      otp: otp,
      password: contact,
    });
    return res
      .status(200)
      .json({ message: "user created succesfully", newuser });
  }
  user.otp = otp;
  await user.save();

  return res.status(200).json({ message: "OTP send succesfully", user });
});

exports.verifyotp = catchAsyncErrors(async (req, res) => {
  const { contact, otp } = req.body;
  const user = await UserSchema.findOne({ contact: contact })
    .select("+password")
    .exec();

  if (!user) {
    return res.status(401).json({ message: "User not register" });
  }
  if (user.otp == otp) {
    sendtoken({ message: "User Logged In" }, user, 201, res);
  } else {
    return res.status(401).json({ message: "Wrong Otp" });
  }
});

exports.logout = (req, res) => {
  res.clearCookie("token", { 
    domain: 'http://localhost:3000/',
    httpOnly: true,
    secure: true,  // Only send cookie over HTTPS
    sameSite: 'None'  // Adjust based on your deployment
 });
 
  res.json({ message: "Successfully signout!", success: true });
};

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await UserSchema.findById(req.id);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.profileupdate = async (req, res) => {
  try {
    const {
      email,
      profilepic,
      addressline1,
      addressline2,
      phone,
      city,
      pincode,
      state,
      country,
    } = req.body;

    // Find user by email
    const user = await UserSchema.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user's profile fields
    if (profilepic) user.profilepic = profilepic;
    if (addressline1) user.addressline1 = addressline1;
    if (addressline2) user.addressline2 = addressline2;
    if (phone) user.phone = phone;
    if (city) user.city = city;
    if (pincode) user.pincode = pincode;
    if (state) user.state = state;
    if (country) user.country = country;

    // Save the updated user document
    const updatedUser = await user.save();

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.log("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.search_product = async (req, res) => {
  try {
    const product = await productdetails.find({
      $or: [
        { product_name: { $regex: req.params.name, $options: "i" } },
        { category: { $regex: req.params.name, $options: "i" } },
      ],
    });
    res.json(product);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.add_cart = async (req, res) => {
  try {
    const { product_id, price, customer_id, shop_id } = req.body;

    const userWithProduct = await UserSchema.findOne({
      _id: customer_id,
      "cart.product_id": product_id,
    });

    if (userWithProduct) {
      const updatedCart = await UserSchema.updateOne(
        { customer_id, "cart.product_id": product_id },
        { $set: { "cart.$.price": price, "cart.$.shop_id": shop_id } }
      );
      return res.status(200).json({ message: "Cart updated successfully" });
    } else {
      const newProduct = {
        product_id,
        price,
        shop_id,
      };

      const updatedUser = await UserSchema.updateOne(
        { _id: customer_id },
        { $push: { cart: newProduct } }
      );
      return res.status(201).json({ message: "Product added to cart" });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.get_address = async (req, res) => {
  const { lat, lon } = req.body;
  const apiKey = process.env.LOCATIONAPIKEY; // Replace with your OpenCage API key
  // const lat = 22.63425010371849;
  // const lon = 75.83256426553845;

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length > 0) {
        console.log("Address:", data.results[0].formatted);
      } else {
        console.log("No results found.");
      }
    })
    .catch((error) => console.error("Error:", error));
};
function generateOTP() {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otp += digits[randomIndex];
  }

  if (otp.length == 4) return otp;
  generateOTP();
}
