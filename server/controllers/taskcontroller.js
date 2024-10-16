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
    const userId = req.user.id; // Assuming you have user info in req.user
    const tasks = await Task.find({ user: userId, completed: false }); // Query should use 'user' to match user ID
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id; // Ensure the task belongs to the logged-in user

  try {
    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

// Mark task as completed
const markTaskAsCompleted = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { completed: true },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }
    res.status(200).json({ message: 'Task marked as completed', task });
  } catch (error) {
    res.status(500).json({ message: 'Error marking task as completed', error: error.message });
  }
};

// Update/Edit task
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, dueDate } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description, dueDate },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Export all the functions in one statement
module.exports = { addTask, getTasks, deleteTask, markTaskAsCompleted, updateTask };
