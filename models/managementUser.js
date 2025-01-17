const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const managementUserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Warden'],
        required: true
    }
}, { timestamps: true });

const ManagementUser = mongoose.model('ManagementUser', managementUserSchema);

module.exports = ManagementUser;
