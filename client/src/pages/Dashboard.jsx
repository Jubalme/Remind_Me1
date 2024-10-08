import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="bg-white shadow-md rounded p-6 max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">Welcome to Your Dashboard!</h1>
      <p className="text-gray-700 text-lg">
        This is your personal dashboard where you can manage all your reminders and tasks. You can add, view, and track your tasks here. Stay organized and never miss a thing!
      </p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-purple-600 mb-2">What Next?</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>
            <Link to="/dashboard/add-task" className="text-purple-700 hover:underline">Create new reminders and tasks</Link>
          </li>
          <li>
            <Link to="/dashboard/my-tasks" className="text-purple-700 hover:underline">View your upcoming tasks and deadlines</Link>
          </li>
          <li>
            <Link to="/dashboard/completed-tasks" className="text-purple-700 hover:underline">View completed tasks</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
