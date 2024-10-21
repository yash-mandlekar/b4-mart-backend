const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: [3, "username should be atleast 3 character long"],
  },
  contact: {
    type: String,
    unique: true,
    required: [true, "Contact is required"],
    maxLength: [10, "Contact must not exceed 10 character"],
    minLength: [10, "Contact should be atleast 10 character long"],
  },
  otp: {
    type: String,
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    select: false,
    maxLength: [15, "Password should not exceed more than 15 characters"],
    minLength: [6, "Password should have atleast 6 characters"],
  },
  profilepic: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: String,
    maxLength: [6, "Pincode must not exceed 6 digit"],
    minLength: [6, "Pincode should be atleast 6 digit long"],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "shop", "admin"],
  },
  lat: {
    type: Number,
  },
  lon: {
    type: Number,
  },
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      count: {
        type: Number,
      },
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  // For ShopKeeper
  orders: [
    {
      customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    },
  ],
});

userSchema.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

userSchema.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("user", userSchema);
