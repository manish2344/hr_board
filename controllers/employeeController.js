// const Employee = require('../models/Employee');

// // Create Employee
// exports.createEmployee = async (req, res) => {
//     try {
//         const employee = new Employee(req.body);
//         await employee.save();
//         res.status(201).json(employee);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Get All Employees
// exports.getEmployees = async (req, res) => {
//     try {
//         const employees = await Employee.find();
//         res.status(200).json(employees);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update Employee
// exports.updateEmployee = async (req, res) => {
//     try {
//         const updatedEmployee = await Employee.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true }
//         );
//         res.status(200).json(updatedEmployee);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Delete Employee
// exports.deleteEmployee = async (req, res) => {
//     try {
//         await Employee.findByIdAndDelete(req.params.id);
//         res.status(200).json({ message: 'Employee deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


const Employee = require('../models/Employee.js');

// Create Employee
exports.createEmployee = async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Employees with Search and Filter
exports.getEmployees = async (req, res) => {
    try {
        const { name, department, role } = req.query; // Search params
        const filter = {};
        if (name) filter.name = { $regex: name, $options: 'i' }; // Case-insensitive search
        if (department) filter.department = { $regex: department, $options: 'i' };
        if (role) filter.role = { $regex: role, $options: 'i' };

        const employees = await Employee.find(filter);
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
