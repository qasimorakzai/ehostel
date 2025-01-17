// models/room.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel', // Reference to the Hostel model
        required: true
      },

    selectFloor: { type: String, required: true },
    room: { type: String, required: true },
    numberOfBeds: { type: Number, required: true },
    booked: { type: String, enum: ['yes', 'no'], required: true },
    hotWater: { type: String, enum: ['yes', 'no'], required: true },
    status: { type: String, enum: ['ready', 'out of service'], required: true },
    partitionedType: { type: String, enum: ['solid', 'partitioned'], required: true },
    bath: { type: String, enum: ['attached', 'common'], required: true },
    floorType: { type: String, enum: ['Marble', 'Carpet', 'Wooden', 'Others'], required: true },
    window: { type: String, enum: ['Yes', 'No'], required: true },
    balcony: { type: String, enum: ['Yes', 'No'], required: true },
    ac: { type: String, enum: ['Yes', 'No'], required: true },
    monthlyRent: {type: Number,required: true },
    securityAmount: {type: Number,required: true},
    heater: { type: String, enum: ['Yes', 'No'], required: true },
    furnished: { type: String, enum: ['Yes', 'No'], required: true },
    remarks: { type: String },
    attachments: { type: String }
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;





