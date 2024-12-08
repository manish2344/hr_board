const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true } ,
    // status: { type: String, enum: ['candidate', 'employee'], default: 'candidate' },
    status: { 
        type: String, 
        enum: ['applied', 'interviewing', 'hired', 'rejected'], 
        default: 'applied' 
    },
    department: { type: String }, 
    role: { type: String }, 
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
