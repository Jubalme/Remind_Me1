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
        setMessage('You are not authorized. Please log in.');
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
          setMessage('No tasks added yet.');
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

  // Function to handle task deletion
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

  // Function to handle marking task as completed
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

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">My Tasks</h1>
      {loading ? (
        <p className="text-purple-500">Loading tasks...</p>
      ) : (
        message && <p className="text-purple-600">{message}</p>
      )}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <TaskItem 
            key={task._id} 
            task={task} 
            onDelete={handleDelete} 
            onMarkCompleted={handleMarkAsCompleted}
            // Pass the Link to Edit route if editing is available
            onEdit={() => <Link to={`/dashboard/tasks/edit/${task._id}`}>Edit</Link>}
          />
        ))}
      </ul>
      {/* Optionally add a link to Completed Tasks page */}
      <Link to="/completed-tasks" className="text-blue-600 hover:underline mt-6 block">View Completed Tasks</Link>
    </div>
  );
};

export default MyTasksPage;
