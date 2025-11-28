require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- ROUTES IMPORTS ---
const authRoutes = require('./routes/authRoutes'); // <--- CHECK THIS
const employeeRoutes = require('./routes/employeeRoutes');
const taskRoutes = require('./routes/taskRoutes');

// --- USE ROUTES ---
app.use('/api/auth', authRoutes); // <--- CHECK THIS (This connects /api/auth/login)
app.use('/api/employees', employeeRoutes);
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected"))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));