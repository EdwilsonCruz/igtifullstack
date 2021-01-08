const mongoose = require("mongoose");

let schema = mongoose.Schema({
  description: { type: String, required: true },  
  value:{ type: Number, required: true },
  category: { type: String, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true, max: 12, min:1 },
  day: { type: Number, required: true, max:31 ,min:1 },
  yearMonth: { type: String, required: true },
  yearMonthDay: { type: String, required: true },
  type: { type: String, required: true }
});

const TransactionModel = mongoose.model("transactions", schema);

module.exports = TransactionModel;
