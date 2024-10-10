import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const AddTask = ({ onTaskAdded }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const [message, setMessage] = useState('');

  const { title, description, dueDate } = taskData;

  const onChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Task added successfully');
        // Call the parent method to notify a new task has been added
        if (onTaskAdded) onTaskAdded();
      } else {
        setMessage(result.message || 'Failed to add task');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-6 max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-purple-700 mb-4">Add New Task</h2>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
            className="w-full p-2 border border-purple-400 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={onChange}
            className="w-full p-2 border border-purple-400 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-sm">Due Date</label>
          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={onChange}
            className="w-full p-2 border border-purple-400 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition duration-300 w-full"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
