const Task = require('../models/taskmodel');

// Controller to handle adding a new task
const addTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    // Create new task document in the database
    const newTask = new Task({
      title,
      description,
      dueDate,
    });

    await newTask.save();
    res.status(201).json({ message: 'Task added successfully', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Controller to get all tasks (optional)
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// controllers/taskController.js


// Get all non-completed tasks for a specific user
const getNonCompletedTasks = async (req, res) => {
  try {
    const userId = req.user.id; // assuming user ID is stored in the request
    const tasks = await Task.find({ user: userId, completed: false });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tasks' });
  }
};




module.exports = { addTask, getTasks,getNonCompletedTasks };
