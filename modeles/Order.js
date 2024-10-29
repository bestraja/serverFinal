const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  totalQty: { type: Number, required: true },
  user: {
    email: { type: String, required: true },
    address: { type: String, required: true },
    tel: { type: String, required: true },
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);