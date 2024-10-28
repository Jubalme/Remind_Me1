import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem2 from '../components/TaskItem2';
import { useNavigate } from 'react-router-dom';

const CompletedTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate(); // To handle navigation if needed

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      setLoading(true);
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

      if (!token) {
        setMessage('You are not authorized. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/tasks/completed-tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const completedTasks = response.data;

        if (completedTasks.length === 0) {
          setMessage('No completed tasks.');
        } else {
          setTasks(completedTasks);
        }
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
        setMessage(`Error fetching tasks: ${error.response ? error.response.data.message : error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');

      await axios.delete(`http://localhost:3000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted task from the state
      setTasks(tasks.filter((task) => task._id !== taskId));
      setMessage('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      setMessage(`Error deleting task: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">Completed Tasks</h1>
      {loading ? (
        <p className="text-purple-500 text-center">Loading tasks...</p>
      ) : (
        message && <p className="text-purple-600 text-center">{message}</p>
      )}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <TaskItem2
            key={task._id} 
            task={task} 
            onDelete={handleDelete} // Allow task deletion
          />
        ))}
      </ul>
    </div>
  );
};

export default CompletedTasksPage;
