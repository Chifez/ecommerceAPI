const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    categories: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('product', productSchema);
