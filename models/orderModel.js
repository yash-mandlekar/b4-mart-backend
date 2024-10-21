const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who placed the order
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }], // List of products in the order
  totalAmount: { type: Number, required: true }, // Total price of the order
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    enum: ["UPI", "Cash on Delivery"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  orderStatus: {
    type: String,
    enum: ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Placed",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("user", OrderSchema);
