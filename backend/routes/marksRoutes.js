const express = require('express');
const router = express.Router();
const Marks = require('../models/Marks');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure only teachers can add marks
const teacherOnly = require('../middleware/teacherOnly');
// POST: Add Marks for a Student
router.post('/add', authMiddleware, teacherOnly, async (req, res) => {
    try {
        const { student, subjects, examType } = req.body;

        // Calculate total marks and percentage
        const totalMarks = Object.values(subjects).reduce((acc, mark) => parseInt(acc) + parseInt(mark), 0);
        const percentage = (totalMarks / (Object.keys(subjects).length * 100)) * 100;
        
        // Assign Grade based on percentage
        let grade;
        if (percentage >= 90) grade = 'A+';
        else if (percentage >= 80) grade = 'A';
        else if (percentage >= 70) grade = 'B';
        else if (percentage >= 60) grade = 'C';
        else if (percentage >= 50) grade = 'D';
        else grade = 'F';

        const newMarks = new Marks({
            student,
            subjects,
            totalMarks,
            percentage,
            grade,
            examType
        });

        await newMarks.save();
        res.status(201).json({ message: 'Marks added successfully', marks: newMarks });
    } catch (error) {
        res.status(500).json({ message: 'Error adding marks', error: error.message });
    }
});

// GET: Fetch Marks by Student ID
router.get('/:studentId', authMiddleware, async (req, res) => {
    try {
        const marks = await Marks.find({ student: req.params.studentId }).populate('student', 'name rollNo class section');
        if (!marks) return res.status(404).json({ message: 'Marks not found' });

        res.json(marks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching marks', error: error.message });
    }
});

// GET: Fetch All Marks (for teachers)
router.get('/', authMiddleware, teacherOnly, async (req, res) => {
    try {
        const marks = await Marks.find().populate('student', 'name rollNo class section');
        res.json(marks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching marks', error: error.message });
    }
});

// DELETE: Remove Marks by ID
router.delete('/:id', authMiddleware, teacherOnly, async (req, res) => {
    try {
        await Marks.findByIdAndDelete(req.params.id);
        res.json({ message: 'Marks deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting marks', error: error.message });
    }
});

module.exports = router;
