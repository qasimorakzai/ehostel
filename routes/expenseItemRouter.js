const express = require('express');
const router = express.Router();
const ExpenseItem = require('../models/expenseItem');
const ExpenseHead = require('../models/expenseHead');
const authenticate=require("../middleware/auth")

router.use(authenticate);

// Show all Expense Items
router.get('/', async (req, res) => {
    try {
        const expenseItems = await ExpenseItem.find().populate('expenseHead');
        res.render('expenseItems/index', { expenseItems });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Show form to add new Expense Item
router.get('/new', async (req, res) => {
    try {
        const expenseHeads = await ExpenseHead.find();
        res.render('expenseItems/new', { expenseHeads });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create new Expense Item
router.post('/', async (req, res) => {
    const { itemName, expenseHead, unit, showInList } = req.body;
    const newItem = new ExpenseItem({
        itemName,
        expenseHead,
        unit,
        showInList: showInList === 'yes'
    });
    try {
        await newItem.save();
        res.redirect('/expense-items');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Show form to edit Expense Item
router.get('/:id/edit', async (req, res) => {
    try {
        const expenseItem = await ExpenseItem.findById(req.params.id).populate('expenseHead');
        const expenseHeads = await ExpenseHead.find();
        res.render('expenseItems/edit', { expenseItem, expenseHeads });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update Expense Item
router.post('/:id', async (req, res) => {
    const { itemName, expenseHead, unit, showInList } = req.body;
    try {
        await ExpenseItem.findByIdAndUpdate(req.params.id, {
            itemName,
            expenseHead,
            unit,
            showInList: showInList === 'yes'
        });
        res.redirect('/expense-items');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete Expense Item
router.post('/:id/delete', async (req, res) => {
    try {
        await ExpenseItem.findByIdAndDelete(req.params.id);
        res.redirect('/expense-items');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
