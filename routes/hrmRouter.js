const express = require('express');
const router = express.Router();
const HRM = require('../models/hrm');
const authenticate =require("../middleware/auth")

router.use(authenticate)

// Show all HRM employees
router.get('/', async (req, res) => {
    try {
      const employees = await HRM.find();
      res.render('hrm/index', { employees });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  // Show form to add new HRM employee
  router.get('/add', (req, res) => {
    res.render('hrm/add');
  });
  
  // Add new HRM employee
  router.post('/add', async (req, res) => {
    const { employeeName, designation, email, contact, employeeStatus, address, reference, employeeSalary, remarks, dateOfJoining, dateOfLeaving } = req.body;
    try {
      const newEmployee = new HRM({
        employeeName,
        designation,
        email,
        contact,
        employeeStatus,
        address,
        reference,
        employeeSalary,
        remarks,
        dateOfJoining: dateOfJoining || Date.now(),
        dateOfLeaving
      });
      await newEmployee.save();
      res.redirect('/hrm');
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  // Show form to edit an HRM employee
  router.get('/edit/:id', async (req, res) => {
    try {
      const employee = await HRM.findById(req.params.id);
      res.render('hrm/edit', { employee });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  // Update HRM employee
  router.post('/edit/:id', async (req, res) => {
    const { employeeName, designation, email, contact, employeeStatus, address, reference, employeeSalary, remarks, dateOfJoining, dateOfLeaving } = req.body;
    try {
      await HRM.findByIdAndUpdate(req.params.id, {
        employeeName,
        designation,
        email,
        contact,
        employeeStatus,
        address,
        reference,
        employeeSalary,
        remarks,
        dateOfJoining,
        dateOfLeaving
      });
      res.redirect('/hrm');
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  // Delete HRM employee
  router.get('/delete/:id', async (req, res) => {
    try {
      await HRM.findByIdAndDelete(req.params.id);
      res.redirect('/hrm');
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  module.exports = router;
  