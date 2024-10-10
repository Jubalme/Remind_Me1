/* eslint-disable react/prop-types */


const NotifyButton = ({ task }) => {
  const handleNotify = () => {
    // Here we would connect to the Calendar API (e.g., Google Calendar)
    console.log('Notification set for task:', task);
    alert(`A notification will remind you about the task on ${task.dueDate}`);
  };

  return (
    <button
      onClick={handleNotify}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Notify Me
    </button>
  );
};

export default NotifyButton;
