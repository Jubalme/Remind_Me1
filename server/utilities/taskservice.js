// src/utils/taskService.js
export const addTask = (task) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  
  export const getTasks = () => {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  };
  
  export const completeTask = (taskId) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  