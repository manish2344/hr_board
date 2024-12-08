const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',  // Reference to the Employee model
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'work from home', 'medical leave'],  // Added more statuses
    required: true
  },
  designation: {
    type: String,
    required: true  // This field is required
  },
  department: {
    type: String,
    required: true  // This field is required
  },
  task: {
    type: String,
    required: true  // This field is required
  }
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
