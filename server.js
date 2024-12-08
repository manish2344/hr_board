const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
require('dotenv').config();
const authMiddleware = require('./middleware/authenticate.js');
const connectDB = require('./db');
const Auth = require('./routes/auth');
const candidateRoutes = require('./routes/Candidate');
const employeeRoutes = require('./routes/Employee.js');
const attendanceRoutes = require('./routes/Attendance.js');
const leaveRoutes = require('./routes/Leave.js');

dotenv.config();
const app = express();


const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
connectDB()

app.use('/api/auth', Auth);
app.use('/api/candidates',authMiddleware, candidateRoutes);
app.use('/api/employees',authMiddleware, employeeRoutes);
app.use('/api/attendance',authMiddleware, attendanceRoutes);
app.use('/api/leaves',authMiddleware, leaveRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
