import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from '../components/TaskItem'; // Assuming you have a TaskItem component for task display
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
        setMessage('You are not authorized');
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
          setMessage('No completed tasks');
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
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Completed Tasks</h1>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        message && <p>{message}</p>
      )}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <TaskItem 
            key={task._id} 
            task={task} 
            onEdit={null} // Disable edit option for completed tasks
            onMarkCompleted={null} // Disable marking as complete
            onDelete={handleDelete} // Allow task deletion
          />
        ))}
      </ul>
    </div>
  );
};

export default CompletedTasksPage;
