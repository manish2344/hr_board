
const Candidate = require('../models/Candidate');
const Employee = require('../models/Employee');
const PDFDocument = require('pdfkit'); // For PDF generation
const fs = require('fs');



exports.createCandidate = async (req, res) => {
    try {
        const { name, email, phone ,yearsOfExperience, role, department} = req.body;
        if (!req.file) {
            return res.status(400).json({ message: 'Resume file is required' });
        }

        const candidate = new Candidate({
            name,
            email,
            phone,
            resumeUrl: req.file.path ,
            role,
            yearsOfExperience,
            department
        });

        await candidate.save();
        res.status(201).json(candidate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Create Candidate
// exports.createCandidate = async (req, res) => {
//     try {
//         const candidate = new Candidate(req.body);
//         await candidate.save();
//         res.status(201).json(candidate);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };



exports.getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find(); // Fetch all candidates
        console.log('Candidates fetched:', candidates); // Debug log
        res.status(200).json(candidates);
    } catch (error) {
        console.error('Error fetching candidates:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get All Candidates with Search and Filter
// exports.getCandidates = async (req, res) => {
//     try {
//         const { name, email } = req.query; // Search params
//         const filter = { status: 'candidate' };
//         if (name) filter.name = { $regex: name, $options: 'i' }; // Case-insensitive search
//         if (email) filter.email = { $regex: email, $options: 'i' };

//         const candidates = await Candidate.find(filter);
//         res.status(200).json(candidates);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Update Candidate
exports.updateCandidate = async (req, res) => {
    try {
        const updatedCandidate = await Candidate.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedCandidate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Candidate
exports.deleteCandidate = async (req, res) => {
    try {
        await Candidate.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Download Candidate Resume
// exports.downloadResume = async (req, res) => {
//     try {
//         const candidate = await Candidate.findById(req.params.id);
//         if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

//         const filePath = candidate.resumeUrl; // Assume resumeUrl is the path to the file
//         res.download(filePath); // Send file as response
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };



// // Download Candidate Resume
// exports.downloadResume = async (req, res) => {
//     try {
//         const candidate = await Candidate.findById(req.params.id);
//         if (!candidate) {
//             return res.status(404).json({ message: 'Candidate not found' });
//         }

//         const filePath = candidate.resumeUrl; // Resume path stored in the database

//         // Check if file exists before trying to send it
//         if (fs.existsSync(filePath)) {
//             res.download(filePath, (err) => {
//                 if (err) {
//                     res.status(500).json({ message: 'Error downloading file' });
//                 }
//             });
//         } else {
//             res.status(404).json({ message: 'Resume file not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };




// Download Candidate Resume
exports.downloadResume = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        const filePath = candidate.resumeUrl; // Resume path stored in the database

        // Check if the file exists before trying to send it
        if (fs.existsSync(filePath)) {
            res.download(filePath, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error downloading file' });
                }
            });
        } else {
            res.status(404).json({ message: 'Resume file not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Transition Candidate to Employee
// exports.moveToEmployee = async (req, res) => {
//     try {
//         const candidate = await Candidate.findById(req.params.id);
//         if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

//         const { department, role } = req.body;

//         // Create Employee
//         const employee = new Employee({
//             name: candidate.name,
//             email: candidate.email,
//             phone: candidate.phone,
//             department,
//             role,
//         });
//         await employee.save();

//         // Delete Candidate
//         await candidate.remove();
//         res.status(200).json({ message: 'Candidate moved to employee successfully', employee });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


exports.moveToEmployee = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        

        // Create Employee from Candidate's information
        const employee = new Employee({
            name: candidate.name,
            email: candidate.email,
            phone: candidate.phone,
            department:candidate.phone,
            role:candidate.phone,
        });
        await employee.save();

        // Optionally, delete the resume file (if not needed anymore)
        if (fs.existsSync(candidate.resumeUrl)) {
            fs.unlinkSync(candidate.resumeUrl); // Delete file from server
        }

        // Remove the candidate from the database using deleteOne
        await Candidate.deleteOne({ _id: candidate._id });

        // Respond with success message and the created employee
        res.status(200).json({
            message: 'Candidate successfully moved to employee.',
            employee,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
