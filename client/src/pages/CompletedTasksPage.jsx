import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from '../components/TaskItem';
import { useNavigate } from 'react-router-dom';

const CompletedTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use navigate from react-router-dom

  useEffect(() => {
    const fetchCompletedTasks = async () => {
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

        const completedTasks = response.data.filter(task => task.completed); // Filter for completed tasks

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

  const handleEdit = (taskId) => {
    navigate(`/dashboard/tasks/edit/${taskId}`); // Navigate to the edit page
  };

  return (
    <div>
      <h1>Completed Tasks</h1>
      {loading ? <p>Loading tasks...</p> : message && <p>{message}</p>}
      <ul>
        {tasks.map((task) => (
          <TaskItem 
            key={task._id} 
            task={task} 
            onEdit={handleEdit} 
            onDelete={() => {}} // Optionally, you can handle delete if needed
            onMarkCompleted={() => {}} // Completed tasks won't be marked again
          />
        ))}
      </ul>
    </div>
  );
};

export default CompletedTasksPage;
