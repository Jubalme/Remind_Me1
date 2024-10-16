/* eslint-disable react/prop-types */

const TaskItem = ({ task, onEdit, onDelete, onMarkCompleted }) => {
  return (
    <li className="flex justify-between items-center border-b py-2">
      <div>
        <h2 className="text-lg">{task.title}</h2>
        <p>{task.description}</p>
        <p>Due: {new Date(task.dueDate).toLocaleString()}</p>
      </div>
      <div className="space-x-2">
        <button 
          onClick={() => onEdit(task._id)} // Pass task ID here
          className="text-blue-500 hover:underline"
        >
          Edit
        </button>
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
