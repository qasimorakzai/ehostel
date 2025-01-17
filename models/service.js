const mongoose = require('mongoose');

// Import the Hostel and Tenant models
const Hostel = require('./hostel');
const Tenant = require('./tenant'); // Adjust the path as needed

const serviceSchema = new mongoose.Schema({
    serviceTitle: {
        type: String,
        required: true
    },
    servicePrice: {
        type: Number,
        required: true
    },
    charged: {
        type: String,
        enum: ['Monthly', 'No Of Usage'],
        required: true
    },
    remarks: {
        type: String,
        required: false
    },
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel',
        required: true
    },
    tenant: { // Reference to the Tenant entity
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    }
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
