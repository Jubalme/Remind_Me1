/* eslint-disable react/prop-types */

const TaskItem = ({ task, onDelete, onMarkCompleted }) => {
  return (
    <li className="flex justify-between items-center border-b py-2">
      <div>
        <h2 className="text-lg font-semibold">{task.title}</h2>
        <p className="text-gray-600">{task.description}</p>
        <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleString()}</p>
      </div>
      <div className="space-x-2">
        <button 
          onClick={() => onMarkCompleted(task._id)} 
          className="text-green-500 hover:underline"
        >
          Complete
        </button>
        <button 
          onClick={() => onDelete(task._id)} 
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
