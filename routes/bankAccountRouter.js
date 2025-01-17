const express = require('express');
const router = express.Router();
const BankAccount = require('../models/bankAccount');
const authenticate =require("../middleware/auth")

router.use(authenticate);

// Show all bank accounts
router.get('/', async (req, res) => {
  const bankAccounts = await BankAccount.find();
  res.render('bankAccounts/showBankAccounts', { bankAccounts });
});

// Show form to add a new bank account
router.get('/add', (req, res) => {
  res.render('bankAccounts/addBankAccount');
});

// Add a new bank account
router.post('/', async (req, res) => {
  const { bank, bankBranch, accountNumber, ibanNumber, accountTitle, openingBalance, status } = req.body;
  const newBankAccount = new BankAccount({
    bank,
    bankBranch,
    accountNumber,
    ibanNumber,
    accountTitle,
    openingBalance,
    status
  });
  await newBankAccount.save();
  res.redirect('/bankAccounts');
});

// Show edit form
router.get('/edit/:id', async (req, res) => {
  const bankAccount = await BankAccount.findById(req.params.id);
  res.render('bankAccounts/editBankAccount', { bankAccount });
});

// Update a bank account
router.post('/edit/:id', async (req, res) => {
  const { bank, bankBranch, accountNumber, ibanNumber, accountTitle, openingBalance, status } = req.body;
  await BankAccount.findByIdAndUpdate(req.params.id, {
    bank,
    bankBranch,
    accountNumber,
    ibanNumber,
    accountTitle,
    openingBalance,
    status
  });
  res.redirect('/bankAccounts');
});

// Delete a bank account
router.post('/delete/:id', async (req, res) => {
  await BankAccount.findByIdAndDelete(req.params.id);
  res.redirect('/bankAccounts');
});

module.exports = router;
