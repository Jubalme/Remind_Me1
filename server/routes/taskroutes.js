const express = require('express');
const { addTask, getTasks } = require('../controllers/taskcontroller');
const router = express.Router();

// Route to add a task
router.post('/', addTask);

// Route to get all tasks (optional for later use)
router.get('/', getTasks);

module.exports = router;
