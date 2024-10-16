/* eslint-disable no-unused-vars */
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate(); // Initialize the navigate function
  const [task, setTask] = useState({ title: '', description: '', dueDate: '', dueTime: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTask(response.data);
      } catch (error) {
        setMessage('Error fetching task');
      }
    };
    fetchTask();
  }, [taskId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const updatedTask = {
        ...task,
        dueDate: new Date(task.dueDate), // Convert to Date object
        dueTime: task.dueTime, // Keep the dueTime as a string
      };
      await axios.put(`http://localhost:3000/api/tasks/${taskId}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Task updated successfully');
      navigate('/dashboard/my-tasks'); // Redirect to MyTasksPage after editing
    } catch (error) {
      setMessage('Error updating task');
    }
  };

  return (
    <div>
      <h1>Edit Task</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate.split('T')[0]} // Assuming dueDate is in ISO format
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Due Time</label>
          <input
            type="time"
            name="dueTime"
            value={task.dueTime} // Ensure dueTime is part of the task state
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
