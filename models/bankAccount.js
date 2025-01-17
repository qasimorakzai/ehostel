const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  bank: { type: String, required: true },
  bankBranch: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ibanNumber: { type: String, required: true },
  accountTitle: { type: String, required: true },
  date: { type: Date, default: Date.now }, // Automatically current date
  openingBalance: { type: Number, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], required: true }
});

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);
module.exports = BankAccount;
