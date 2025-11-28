const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks (Populate shows the relationship!)
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo'); // <--- Bonus points for using populate
        res.json(tasks);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST create task
router.post('/', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.json(newTask);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

// DELETE task
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;