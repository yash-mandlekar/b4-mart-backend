const UserSchema = require("../models/userModel");
const productSchema = require("../models/productModel");
const { sendtoken } = require("../utils/sendToken");
const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const { default: mongoose } = require("mongoose");

exports.deleteCollection = async (req, res) => {
  await UserSchema.deleteMany();
  const user = await UserSchema.find();
  res.json(user);
};

exports.login = catchAsyncErrors(async (req, res) => {
  const { contact } = req.body;
  const user = await UserSchema.findOne({ contact: contact });
  const otp = generateOTP();

  if (!user) {
    const newuser = await UserSchema.create({
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
    return res.json({ success: false, message: "User not register" });
  }
  if (user.otp == otp) {
    sendtoken({ message: "User Logged In" }, user, 201, res);
  } else {
    return res.json({ success: false, message: "Wrong Otp" });
  }
});

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // Only send cookie over HTTPS
    sameSite: "None", // Adjust based on your deployment
  });

  res.json({ message: "Successfully signout!", success: true });
};

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await UserSchema.findById(req.id).populate("cart.product")
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

exports.single_product = async (req, res) => {
  try {
    const product = await productSchema.findOne({ _id: req.params.id });
    if (!product) return res.json({ message: "product not found" });
    res.json({ message: "Single Product Found", data: product });
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ message: "Product Not Found" });
  }
};
exports.search_product = async (req, res) => {
  try {
    const product = await productSchema.find({
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
    const user = await UserSchema.findOne({ _id: req.id });
    let { cart } = user;
    const productId = new mongoose.Types.ObjectId(req.params.id);

    const productInCart = cart.find((e) => e.product.equals(productId));
    if (productInCart) {
      productInCart.count++;
      await user.save();
    } else {
      cart.push({ product: req.params.id, count: 1 });
      await user.save();
    }

    return res.status(201).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.remove_cart = async (req, res) => {
  try {
    const user = await UserSchema.findOne({ _id: req.id });
    let { cart } = user;
    const productId = new mongoose.Types.ObjectId(req.params.id);

    // Find the product in the cart
    const productInCart = cart.find((e) => e.product.equals(productId));

    if (productInCart) {
      if (productInCart.count > 1) {
        // If count is more than 1, decrement the count
        productInCart.count--;
      } else {
        // If count is 1, remove the product from the cart
        cart = cart.filter((e) => !e.product.equals(productId));
        user.cart = cart; // Assign the filtered cart back to the user
      }

      await user.save(); // Save changes to the user
      return res
        .status(200)
        .json({ message: "Product removed from cart", cart });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
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
