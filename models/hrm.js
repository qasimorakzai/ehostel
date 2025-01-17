// models/hrm.js
const mongoose = require('mongoose');

const hrmSchema = new mongoose.Schema({
  name: { type: String, required: true },
    role: { type: String, required: true } ,// 'admin' or 'warden'
  employeeName: { type: String, required: true },
  designation: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  employeeStatus: { 
    type: String, 
    enum: ['On Job', 'Left', 'Terminated'], 
    required: true 
  },
  address: { type: String },
  reference: { type: String },
  employeeSalary: { type: Number, required: true },
  remarks: { type: String },
  dateOfJoining: { type: Date, default: Date.now },
  dateOfLeaving: { type: Date }
});

const HRM = mongoose.model('HRM', hrmSchema);
module.exports = HRM;
