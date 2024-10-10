const express = require('express');
const { addTask, getTasks } = require('../controllers/taskcontroller');
const { getNonCompletedTasks } = require('../controllers/taskcontroller');
const router = express.Router();

// Route to add a task
router.post('/', addTask);

// Route to get all tasks (optional for later use)
router.get('/', getTasks);
router.get('/non-completed-tasks', getNonCompletedTasks);
// routes/tasks.js

// Mark task as completed
router.patch('/tasks/:id/complete', async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
  
      task.isCompleted = true; // Set the completed flag to true
      await task.save();
  
      res.json({ message: 'Task marked as completed' });
    } catch (error) {
      res.status(500).json({ message: 'Error marking task as completed' });
    }
  });
  
  // Get completed tasks
  router.get('/tasks/completed', async (req, res) => {
    try {
      const completedTasks = await Task.find({ isCompleted: true });
      res.json(completedTasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching completed tasks' });
    }
  });
  

module.exports = router;
