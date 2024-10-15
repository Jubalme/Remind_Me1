const Task = require('../models/taskmodel');

// Controller to handle adding a new task
const addTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.user.id; // Ensure that user is logged in and their ID is accessible

    // Create a new task linked to the logged-in user
    const newTask = new Task({
      title,
      description,
      dueDate,
      user: userId,
    });

    await newTask.save();
    res.status(201).json({ message: 'Task added successfully', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Fetch incomplete tasks for the logged-in user
 const getTasks = async (req, res) => {
  try {
    const userId = req.user.id; // assuming you have user info in req.user
    const tasks = await Task.find({ userId, completed: false }); // Get only uncompleted tasks
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};


module.exports = { addTask ,getTasks};
