import { useEffect, useState } from 'react';
import axios from 'axios';

const CompletedTasksPage = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tasks/completed');
        setCompletedTasks(response.data);
      } catch (error) {
        setError('Failed to fetch completed tasks');
      }
    };

    fetchCompletedTasks();
  }, []);

  return (
    <div className="bg-white shadow-md rounded p-6 max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">Completed Tasks</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="list-disc list-inside text-gray-600">
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <li key={task.id} className="mb-4 p-4 border border-gray-200 rounded">
              <h3 className="text-xl font-semibold text-purple-700">{task.title}</h3>
              <p className="text-gray-700">Description: {task.description}</p>
              <p className="text-gray-500">Completed on: {new Date(task.completedAt).toLocaleString()}</p>
            </li>
          ))
        ) : (
          <p>No completed tasks found</p>
        )}
      </ul>
    </div>
  );
};

export default CompletedTasksPage;
