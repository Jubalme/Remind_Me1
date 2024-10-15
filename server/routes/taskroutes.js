const express = require('express');
const { addTask, getTasks} = require('../controllers/taskcontroller');
const authMiddleware = require('../middleware/auth'); // Authentication middleware

const router = express.Router();

// Route to add task (only for logged-in users)
router.post('/add', authMiddleware, addTask);


// Fetch tasks for authenticated user
router.get('/tasks', getTasks);

module.exports = router;
