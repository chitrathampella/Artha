const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    userid:{
        type:String,
        required : true
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Type is required'],
    },
    date: {
      type: Date, // 🔥 FIXED: Changed from String to Date
      required: [true, 'Date is required'],
    },
  },
  { timestamps: true }
);

const transactionModel = mongoose.model('transactions', transactionSchema);

module.exports = transactionModel;
