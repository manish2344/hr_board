

const express = require('express');
const router = express.Router();

const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee'); // Import Employee model

// Add or Update Attendance
router.post('/', async (req, res) => {
    const { employeeId, date, status, designation, department, task } = req.body;

    try {
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(400).json({ message: 'Employee not found.' });
        }

        const existingAttendance = await Attendance.findOne({ employeeId, date });
        let attendance;

        if (existingAttendance) {
            // Update attendance status and other fields
            existingAttendance.status = status;
            existingAttendance.designation = designation;
            existingAttendance.department = department;
            existingAttendance.task = task;
            attendance = await existingAttendance.save();
        } else {
            // Create new attendance record with all details
            attendance = new Attendance({ employeeId, date, status, designation, department, task });
            await attendance.save();
        }

        const populatedAttendance = await Attendance.findById(attendance._id)
            .populate('employeeId', 'name email')
            .exec();

        res.status(200).json({
            message: existingAttendance ? 'Attendance updated successfully.' : 'Attendance added successfully.',
            data: populatedAttendance
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding/updating attendance.', error: error.message });
    }
});

// Get Attendance Records (with Filters)
router.get('/', async (req, res) => {
    const { employeeId, date, status, designation, department, task } = req.query;

    try {
        const query = {};
        if (employeeId) query.employeeId = employeeId;
        if (date) query.date = new Date(date);
        if (status) query.status = status;
        if (designation) query.designation = designation;
        if (department) query.department = department;
        if (task) query.task = task;

        const attendanceRecords = await Attendance.find(query)
            .populate('employeeId', 'name email')
            .exec();

        res.status(200).json({ data: attendanceRecords });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance records.', error: error.message });
    }
});

// Update Specific Attendance Record
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status, designation, department, task } = req.body;

    try {
        const attendance = await Attendance.findByIdAndUpdate(id, { 
            status, 
            designation, 
            department, 
            task 
        }, { new: true });

        if (!attendance) return res.status(404).json({ message: 'Attendance record not found.' });

        const populatedAttendance = await Attendance.findById(attendance._id)
            .populate('employeeId', 'name email');

        res.status(200).json({ message: 'Attendance updated successfully.', data: populatedAttendance });
    } catch (error) {
        res.status(500).json({ message: 'Error updating attendance.', error: error.message });
    }
});

module.exports = router;
