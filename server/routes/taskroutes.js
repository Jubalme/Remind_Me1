const express = require('express');
const { addTask, getTasks , deleteTask, markTaskAsCompleted, updateTask} = require('../controllers/taskcontroller');
const authMiddleware = require('../middleware/auth'); // Authentication middleware

const router = express.Router();

// Route to add task (only for logged-in users)
router.post('/add', authMiddleware, addTask);


// Fetch tasks for authenticated user
router.post('/add', authMiddleware, addTask);
router.get('/my-tasks', authMiddleware, getTasks); // Apply authMiddleware to protect this route
// Delete a task
router.delete('/:id', authMiddleware, deleteTask);

// Mark task as completed
router.patch('/:id/complete', authMiddleware, markTaskAsCompleted);

// Other routes
router.put('/:taskId', authMiddleware, updateTask); // Route for updating a task


module.exports = router;
