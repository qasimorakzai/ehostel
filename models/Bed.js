// models/Bed.js
const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
    bedTitle: {
        type: String,
        required: true,
    },
    bedNumber: {
        type: String,
        required: true,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    bedStatus: {
        type: String,
        enum: ['Ready', 'Not Ready'],
        required: true,
    },
    remarks: {
        type: String,
    },
});

// Check if the model already exists to avoid overwriting
const Bed = mongoose.models.Bed || mongoose.model('Bed', bedSchema);

module.exports = Bed;
