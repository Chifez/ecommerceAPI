const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  cartId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  status: {
    type: String,
    default: 'pending',
  },
});

module.exports = mongoose.model('products', orderSchema);
