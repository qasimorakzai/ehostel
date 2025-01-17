const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    rentType: { type: String, required: true },
    tenant: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    bed: { type: Schema.Types.ObjectId, ref: 'Bed', required: true },
    security: { type: Number, required: true },
    monthlyRent: { type: Number, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date },
    remarks: { type: String }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
