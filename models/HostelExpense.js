const mongoose = require('mongoose');

const hostelExpenseSchema = new mongoose.Schema({
  hostel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hostel', required: true },
  date: { type: Date, required: true },
  expenseHead: { type: mongoose.Schema.Types.ObjectId, ref: 'ExpenseHead', required: true },
  expenseTitle: { type: String, required: true },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true }, // Added tenant reference
  qty: { type: Number, required: true },
  unit: { type: String, enum: ['kg', 'liter', 'meter', 'dozen'], required: true },
  unitPrice: { type: Number, required: true },
  amount: { type: Number, required: true },
  total: { type: Number, default: 0 },
  paymentStatus: { type: String, enum: ['Paid', 'Unpaid'], required: true },
  paymentMethod: { type: String, enum: ['Cash in Hand', 'Personal Account', 'Bank'], required: function() {
    return this.paymentStatus === 'Paid';
  }},
  remarks: { type: String },
  attachments: { type: String }
});

module.exports = mongoose.model('HostelExpense', hostelExpenseSchema);
