/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
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
        const { title, description, dueDate, dueTime } = response.data;
        setTask({
          title,
          description,
          dueDate: dueDate ? dueDate.split('T')[0] : '', // Format date to YYYY-MM-DD
          dueTime: dueTime || '' // Set dueTime as a string or empty
        });
      } catch (error) {
        console.error('Error fetching task:', error);
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
      await axios.put(`http://localhost:3000/api/tasks/${taskId}`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Task updated successfully');
      navigate('/dashboard/my-tasks');
    } catch (error) {
      console.error('Error updating task:', error);
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
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Due Time</label>
          <input
            type="time"
            name="dueTime"
            value={task.dueTime}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
