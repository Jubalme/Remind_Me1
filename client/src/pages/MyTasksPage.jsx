import { useEffect, useState } from 'react';
import axios from 'axios';

const MyTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tasks');
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          setTasks([]);
        }
      } catch (error) {
        setError('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, []);

  const handleCompleteTask = async (taskId) => {
    try {
      await axios.patch(`http://localhost:3000/api/tasks/${taskId}/complete`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); // Remove completed task from the list
    } catch (error) {
      setError('Failed to mark task as completed');
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-6 max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">My Tasks</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="list-disc list-inside text-gray-600">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="mb-4 p-4 border border-gray-200 rounded">
              <h3 className="text-xl font-semibold text-purple-700">{task.title}</h3>
              <p className="text-gray-700">Description: {task.description}</p>
              <p className="text-gray-500">Due Date & Time: {new Date(task.dueDate).toLocaleString()}</p>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => handleCompleteTask(task.id)}
              >
                Mark as Completed
              </button>
            </li>
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </ul>
    </div>
  );
};

export default MyTasksPage;
