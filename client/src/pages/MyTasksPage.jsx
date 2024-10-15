import  { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from '../components/TaskItem';

const MyTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setMessage('You are not authorized');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.length === 0) {
          setMessage('No tasks added');
        } else {
          setTasks(response.data.filter(task => !task.completed)); // Filter for incomplete tasks
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setMessage('Error fetching tasks');
      }
    };

    fetchTasks();
  }, []);

  // Function to handle delete task
  const handleDelete = async (taskId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Function to handle mark as completed
  const handleMarkAsCompleted = async (taskId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(`http://localhost:3000/api/tasks/${taskId}/complete`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.map(task => (task._id === taskId ? { ...task, completed: true } : task)));
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  // Function to handle edit task
  const handleEdit = (taskId) => {
    // Redirect to edit page
    window.location.href = `/tasks/edit/${taskId}`; // Change this to your edit page route
  };

  return (
    <div>
      <h1>My Tasks</h1>
      {message && <p>{message}</p>}
      <ul>
        {tasks.map((task) => (
          <TaskItem 
            key={task._id} 
            task={task} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            onMarkCompleted={handleMarkAsCompleted} 
          />
        ))}
      </ul>
    </div>
  );
};

export default MyTasksPage;
