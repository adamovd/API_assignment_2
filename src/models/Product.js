const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  articleNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  description: {
    type: String,
    maxLength: 500,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
