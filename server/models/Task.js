const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ['Todo', 'In-Progress', 'Done'], default: 'Todo' },
    dueDate: Date,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' } // <--- The Critical Relationship
});

module.exports = mongoose.model('Task', TaskSchema);