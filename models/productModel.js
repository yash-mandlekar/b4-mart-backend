const mongoose = require("mongoose");

const productSubSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "vegetables & fruits",
      "cold drinks & juice",
      "bakery & biscuits",
      "dry fruits  masall & oil",
      "organic & premium",
      "pharma & wellness",
      "ice cream & frozen desserts",
      "beauty & cosmetics",
      "navratry store",
      "dairy & breackfast",
      "instant & frozen food",
      "sweet tooth",
      "sauces & spreads",
      "paan corner",
      "cleaning essentials",
      "personal care",
      "toys & games",
      "munchies",
      "tea coffee & health drinks",
      "atta rice & dal",
      "chicken meat & fish",
      "baby care",
      "home & office",
      "pet care",
      "print store",
    ],
  },
  quantity: {
    type: Number,
    required: true,
  },
  quantity_type: {
    type: String,
    required: true,
    enum: ["g", "kg", "l", "ml", "peice"],
  },
  stocks: {
    type: Number,
    required: true,
  },
  productpic: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  description: {
    type: String,
  },
  shop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("product", productSubSchema);
