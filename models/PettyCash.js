const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pettyCashSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    amountAdded: {
        type: Number,
        required: true
    },
    attachments: {
        type: String,
        required: false
    },
    remarks: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('PettyCash', pettyCashSchema);
