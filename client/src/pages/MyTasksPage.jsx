import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from '../components/TaskItem';
import { Link } from 'react-router-dom'; // Import Link

const MyTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        setMessage('You are not authorized');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/tasks/my-tasks', {
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
        setMessage(`Error fetching tasks: ${error.response ? error.response.data.message : error.message}`);
      } finally {
        setLoading(false);
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
      setMessage('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      setMessage(`Error deleting task: ${error.response ? error.response.data.message : error.message}`);
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
      setMessage('Task marked as completed');
    } catch (error) {
      console.error('Error marking task as completed:', error);
      setMessage(`Error marking task as completed: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  // Remove the handleEdit function
  // Instead, use the onEdit prop in the TaskItem component directly

  return (
    <div>
      <h1>My Tasks</h1>
      {loading ? <p>Loading tasks...</p> : message && <p>{message}</p>}
      <ul>
        {tasks.map((task) => (
          <TaskItem 
            key={task._id} 
            task={task} 
            onEdit={() => (
              <Link to={`/dashboard/tasks/edit/${task._id}`}>Edit</Link>
            )} // Update this to use Link
            onDelete={handleDelete} 
            onMarkCompleted={handleMarkAsCompleted} 
          />
        ))}
      </ul>
    </div>
  );
};

export default MyTasksPage;
