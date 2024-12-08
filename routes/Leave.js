

// const express = require('express');
// const router = express.Router();
// const Leave = require('../models/Leave'); // Leave model
// const Employee = require('../models/Employee'); // Employee model

// // Apply for leave (Employee)
// router.post('/apply', async (req, res) => {
//     const { employeeId, leaveType, startDate, endDate } = req.body;

//     try {
//         // Check if employee exists
//         const employee = await Employee.findById(employeeId);
//         if (!employee) {
//             return res.status(404).json({ message: 'Employee not found.' });
//         }

//         // Create a new leave request
//         const newLeave = new Leave({ employeeId, leaveType, startDate, endDate, status: 'pending' });
//         await newLeave.save();

//         res.status(201).json({
//             message: 'Leave request submitted successfully.',
//             data: newLeave
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Error applying for leave.',
//             error: error.message
//         });
//     }
// });

// // Get all leave requests (Admin)
// router.get('/requests', async (req, res) => {
//     try {
//         const leaveRequests = await Leave.find()
//             .populate('employeeId', 'name email')  // Get employee details with leave requests
//             .sort({ createdAt: -1 }); // Sorting by latest requests first
//         res.status(200).json({ data: leaveRequests });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Error fetching leave requests.',
//             error: error.message
//         });
//     }
// });

// // Update leave status (Admin)
// router.put('/update/:id', async (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body;

//     try {
//         // Check if the status is valid
//         if (!['approved', 'denied'].includes(status)) {
//             return res.status(400).json({ message: 'Invalid status. Status must be either "approved" or "denied".' });
//         }

//         // Update the leave request
//         const updatedLeave = await Leave.findByIdAndUpdate(id, { status }, { new: true });
//         if (!updatedLeave) {
//             return res.status(404).json({ message: 'Leave request not found.' });
//         }

//         res.status(200).json({
//             message: 'Leave status updated successfully.',
//             data: updatedLeave
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Error updating leave status.',
//             error: error.message
//         });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave'); // Leave model
const Employee = require('../models/Employee'); // Employee model

// Apply for leave (Employee)
router.post('/apply', async (req, res) => {
    const { employeeId, leaveType, startDate, endDate } = req.body;

    try {
        // Check if employee exists
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        // Create a new leave request
        const newLeave = new Leave({ employeeId, leaveType, startDate, endDate, status: 'pending' });
        await newLeave.save();

        // Include employee's name and email in the response
        const leaveWithEmployeeDetails = await Leave.findById(newLeave._id).populate('employeeId', 'name email');

        res.status(201).json({
            message: 'Leave request submitted successfully.',
            data: leaveWithEmployeeDetails
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error applying for leave.',
            error: error.message
        });
    }
});

// Get all leave requests (Admin)
router.get('/requests', async (req, res) => {
    try {
        const leaveRequests = await Leave.find()
            .populate('employeeId', 'name email')  // Get employee details with leave requests
            .sort({ createdAt: -1 }); // Sorting by latest requests first
        res.status(200).json({ data: leaveRequests });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching leave requests.',
            error: error.message
        });
    }
});

// Update leave status (Admin)
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        // Check if the status is valid
        if (!['approved', 'denied'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status. Status must be either "approved" or "denied".' });
        }

        // Update the leave request
        const updatedLeave = await Leave.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedLeave) {
            return res.status(404).json({ message: 'Leave request not found.' });
        }

        res.status(200).json({
            message: 'Leave status updated successfully.',
            data: updatedLeave
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating leave status.',
            error: error.message
        });
    }
});

module.exports = router;
