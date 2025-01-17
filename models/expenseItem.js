const mongoose = require('mongoose');

const expenseItemSchema = new mongoose.Schema({
    itemName: { type: String, required: true }, // Add this field
    expenseHead: { type: mongoose.Schema.Types.ObjectId, ref: 'ExpenseHead', required: true },
    unit: { type: String, required: true },
    showInList: { type: Boolean, required: true }
});

const ExpenseItem = mongoose.model('ExpenseItem', expenseItemSchema);
module.exports = ExpenseItem;
