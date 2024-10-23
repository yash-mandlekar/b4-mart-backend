const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // User who placed the order
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      count: {
        type: Number,
      },
    },
  ], // List of products in the order
  totalAmount: { type: Number, required: true }, // Total price of the order
  shippingAddress: {
    city: { type: String, required: true },
    area: { type: String, required: true },
    house_no: { type: String, required: true },
    landmark: { type: String },
    pincode: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    enum: ["UPI", "COD"],
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
module.exports = mongoose.model("order", OrderSchema);
