const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// GET all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST create employee
router.post('/', async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.json(newEmployee);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

// DELETE employee (NEW!)
router.delete('/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: "Employee deleted" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;