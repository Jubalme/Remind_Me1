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

module.exports = { addTask, getTasks };
