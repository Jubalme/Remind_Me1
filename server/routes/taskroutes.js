const express = require('express');
const { addTask, getTasks, deleteTask, markTaskAsCompleted, updateTask } = require('../controllers/taskcontroller');
const authMiddleware = require('../middleware/auth'); // Authentication middleware
const Task = require('../models/taskmodel'); // Import the Task model

const router = express.Router();

// Route to add task (only for logged-in users)
router.post('/add', authMiddleware, addTask);

// Fetch tasks for authenticated user (not completed tasks)
router.get('/my-tasks', authMiddleware, getTasks);

// Delete a task
router.delete('/:id', authMiddleware, deleteTask);

// Mark a task as completed
router.patch('/:taskId/complete', authMiddleware, markTaskAsCompleted);

// Route to fetch completed tasks for the authenticated user
router.get('/completed-tasks', authMiddleware, async (req, res) => {
    try {
        // Find tasks that are marked as completed for the authenticated user
        const completedTasks = await Task.find({
            userId: req.user._id, // Assuming tasks are linked to users
            completed: true // Only fetch tasks that are marked as completed
        });

        if (!completedTasks.length) {
            return res.status(404).json({ message: 'No completed tasks found' });
        }

        res.status(200).json(completedTasks);
    } catch (error) {
        console.error('Error fetching completed tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route for updating a task
router.put('/:taskId', authMiddleware, updateTask);

module.exports = router;
