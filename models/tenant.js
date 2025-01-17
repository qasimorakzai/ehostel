const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    contact: { type: String, required: true },
    cnic: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    nationality: { type: String, required: true },
    province: { type: String, enum: ['KPK', 'Sindh', 'Balochistan', 'Punjab'], required: true },
    country: { type: String, required: true },
    profession: { type: String, enum: ['Student', 'Govt Job', 'Private Job', 'Business'], required: true },
    remark: { type: String },
    guardianInfo: {
        name: { type: String, required: true },
        relation: { type: String, required: true },
        contact: { type: String, required: true },
        cnic: { type: String, required: true },
    },
    emergencyInfo: {
        name: { type: String, required: true },
        contact: { type: String, required: true },
    },
});

module.exports = mongoose.model('Tenant', tenantSchema);
