/* eslint-disable react/prop-types */

const TaskItem = ({ task, onDelete }) => {
    return (
      <li className="flex justify-between items-center border-b py-2">
        <div>
          <h2 className="text-lg font-semibold">{task.title}</h2>
          <p className="text-gray-600">{task.description}</p>
          <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleString()}</p>
        </div>
        <div>
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
  