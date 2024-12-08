const mongoose = require('mongoose');

// Leave schema definition
const leaveSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    leaveType: { type: String, enum: ['sick', 'vacation', 'other'], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Leave', leaveSchema);
