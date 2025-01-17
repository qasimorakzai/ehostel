const express = require('express');
const router = express.Router();
const ExpenseHead = require('../models/expenseHead');
const authenticate =require("../middleware/auth")

router.use(authenticate)
// Show all expense heads
router.get('/', async (req, res) => {
  try {
    const expenseHeads = await ExpenseHead.find().populate('parent');
    res.render('expenseHeads/showExpenseHeads', { expenseHeads });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add expense head form
router.get('/add', async (req, res) => {
  try {
    const expenseHeads = await ExpenseHead.find();
    res.render('expenseHeads/addExpenseHead', { expenseHeads });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Create a new expense head
router.post('/add', async (req, res) => {
  try {
    const { title, categories, parent, remarks } = req.body;
    const newExpenseHead = new ExpenseHead({
      title,
      categories,
      parent: parent ? parent : null, // Update: parent should be null if not provided
      remarks
    });

    await newExpenseHead.save();
    res.redirect('/expenseHeads');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Edit expense head form
router.get('/edit/:id', async (req, res) => {
  try {
    const expenseHead = await ExpenseHead.findById(req.params.id).populate('parent');
    const allExpenseHeads = await ExpenseHead.find(); // To populate parent dropdown
    res.render('expenseHeads/editExpenseHead', { expenseHead, allExpenseHeads });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update expense head
router.post('/edit/:id', async (req, res) => {
  try {
    const { title, categories, parent, remarks } = req.body;

    await ExpenseHead.findByIdAndUpdate(req.params.id, {
      title,
      categories,
      parent: parent ? parent : null, // Update: parent should be null if not provided
      remarks
    });

    res.redirect('/expenseHeads');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete expense head
router.post('/delete/:id', async (req, res) => {
  try {
    await ExpenseHead.findByIdAndDelete(req.params.id);
    res.redirect('/expenseHeads');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
