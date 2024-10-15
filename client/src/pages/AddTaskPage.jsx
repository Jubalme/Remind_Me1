import { useState } from 'react';
import axios from 'axios';

const AddTaskPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');

  const handleAddTask = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('You are not authorized');
      return;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post(
        'http://localhost:3000/api/tasks/add',
        {
          title,
          description,
          dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      setMessage('Task added successfully!');
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred');
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-6 max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Add Task</h1>
      <form onSubmit={handleAddTask} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows="4"
        />
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-800 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors duration-300"
        >
          Add Task
        </button>
      </form>
      {message && <p className="text-center text-purple-600 mt-4">{message}</p>}
    </div>
  );
};

export default AddTaskPage;
