const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, default: 'Staff' }, // e.g., Developer, Designer
    email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Employee', EmployeeSchema);