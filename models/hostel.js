const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostelSchema = new Schema({
    hostelName: { type: String, required: true },
    landLineNumber: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    address: { type: String, required: true },
    googleMap: { type: String },
    websiteAddress: { type: String },
    socialMedia: { type: String },
    hostelFor: { type: String, required: true },
    email: { type: String, required: true },
    attachments: { type: String },
    selectAdmin: { type: Schema.Types.ObjectId, ref: 'ManagementUser' },  // Reference to ManagementUser for Admin
    selectWardens: [{ type: Schema.Types.ObjectId, ref: 'ManagementUser' }]  // Reference to ManagementUser for Wardens
}, { timestamps: true });

const Hostel = mongoose.model('Hostel', hostelSchema);

module.exports = Hostel;
