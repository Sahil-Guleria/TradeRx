const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  tradeId: { type: String, default: mongoose.Types.ObjectId, unique: true },
  stockName: String,
  type: String,
  quantity: Number,
  price: Number,
  date: Date,
});

module.exports = mongoose.model('Trade', tradeSchema);
