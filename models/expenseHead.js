const mongoose = require('mongoose');

const expenseHeadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  categories: {
    type: String,
    enum: ['Hostel Expenses', 'Tenant Expense'],
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,  // Updated to ObjectId reference
    ref: 'ExpenseHead',  // Reference to the same model
    default: null
  },
  remarks: {
    type: String
  }
});

const ExpenseHead = mongoose.model('ExpenseHead', expenseHeadSchema);
module.exports = ExpenseHead;
