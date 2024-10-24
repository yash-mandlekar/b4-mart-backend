const UserSchema = require("../models/userModel");
const productSchema = require("../models/productModel");
const orderSchema = require("../models/orderModel");
const { sendtoken } = require("../utils/sendToken");
const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const { default: mongoose } = require("mongoose");
const Razorpay = require("razorpay");

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
  const user = await UserSchema.findById(req.id).populate("cart.product");
  res.status(200).json({
    success: true,
    user,
  });
});

// const {
//   email,
//   profilepic,
//   addressline1,
//   addressline2,
//   phone,
//   city,
//   pincode,
//   state,
//   country,
// } = req.body;

// // Find user by email
// const user = await UserSchema.findOne({ email: email });
// if (!user) {
//   return res.status(404).json({ message: "User not found" });
// }

// // Update user's profile fields
// if (profilepic) user.profilepic = profilepic;
// if (addressline1) user.addressline1 = addressline1;
// if (addressline2) user.addressline2 = addressline2;
// if (phone) user.phone = phone;
// if (city) user.city = city;
// if (pincode) user.pincode = pincode;
// if (state) user.state = state;
// if (country) user.country = country;

// // Save the updated user document
// const updatedUser = await user.save();
exports.profileupdate = async (req, res) => {
  try {
    const user = await UserSchema.findOneAndUpdate({ _id: req.id }, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Profile updated successfully", user });
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
    const { search_product } = req.body;
    const products = await productSchema.find({
      $or: [
        { product_name: { $regex: search_product, $options: "i" } },
        { category: { $regex: search_product, $options: "i" } },
      ],
    });
    res.json(products);
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
    } else {
      cart.push({ product: req.params.id, count: 1 });
    }
    await user.save();
    const founduser = await UserSchema.findOne({ _id: req.id }).populate(
      "cart.product"
    );

    return res
      .status(201)
      .json({ message: "Product added to cart", cart: founduser.cart });
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

      const founduser = await UserSchema.findOne({ _id: req.id }).populate(
        "cart.product"
      );
      return res
        .status(200)
        .json({ message: "Product removed from cart", cart: founduser.cart });
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

// create order
exports.create_order = async (req, res) => {
  const { paymentMethod, city, area, house_no, landmark, pincode } = req.body;
  try {
    const user = await UserSchema.findOne({ _id: req.id }).populate(
      "cart.product"
    );
    var tot = 0;
    user.cart.map((e) => {
      tot += e.count * e.product.price;
    });

    user.cart.forEach(async (e) => {
      const shop = await UserSchema.findOne({ _id: e.product.shop_id });
      shop.shoporders.push({ user: user._id, product: e.product._id });
      await shop.save();
    });
    const order = await orderSchema.create({
      userId: user._id,
      products: user.cart,
      totalAmount: tot,
      shippingAddress: {
        city: city,
        area: area,
        house_no: house_no,
        landmark: landmark && landmark,
        pincode: pincode,
      },
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod == "COD" ? "Pending" : "Completed",
    });
    user.cart = [];
    user.orders.push(order._id);
    await user.save();
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
exports.user_order = async (req, res) => {
  const user = await UserSchema.findOne({ _id: req.id }).populate({
    path: "orders",
    populate: {
      path: "products",
      populate: {
        path: "product",
        model: "product",
      },
    },
  });
  res.status(200).json({ orders: user.orders });
};
exports.update_profile = async (req, res) => {
  const user = await UserSchema.findOne({ _id: req.id });
  user.profilepic = req.body.url;
  await user.save();
  res.status(200).json({ user });
};

exports.payment_gateway = async (req, res) => {
  const user = await UserSchema.findOne({ _id: req.id }).populate(
    "cart.product"
  );
  var tot = 0;
  user.cart.map((e) => {
    tot += e.count * e.product.price;
  });

  const razorpay = new Razorpay({
    key_id: "rzp_test_LQzqvbK2cWMGRg", // rzp_test_GuqZTaK14cKpuo
    key_secret: "PwCxDvLmPtKVKxZP5BM7eFFx", // 2PGLEdDfYbSGA9oDmIWtj
  });

  const options = {
    amount: tot * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };
  const order = await razorpay.orders.create(options); // i am getting error in this line
  res.status(200).json(order);
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
