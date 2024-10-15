/* eslint-disable react/prop-types */


const TaskItem = ({ task, onEdit, onDelete, onMarkCompleted }) => {
  return (
    <li key={task._id} className="border-b py-2">
      <h2 className="font-bold">{task.title}</h2>
      <p>{task.description}</p>
      <p>Due Date: {new Date(task.dueDate).toLocaleString()}</p>
      <div className="flex space-x-2 mt-2">
        <button
          onClick={() => onEdit(task._id)}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onMarkCompleted(task._id)}
          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
        >
          Mark as Completed
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
