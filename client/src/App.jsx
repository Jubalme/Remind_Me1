
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useState } from 'react';
import AddTaskPage from './pages/AddTaskPage';
import MyTasksPage from './pages/MyTasksPage';
import CompletedTasksPage from './pages/CompletedTasksPage';
// App component
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // To track user authentication status

  // Function to handle user authentication
  const handleAuth = (status) => {
    setIsAuthenticated(status);
  };
  

  return (
    <Router>
      <div className="bg-cream-pink min-h-screen">
        {/* Header/NavBar */}
        <header className="bg-purple-900 text-white p-4 shadow-md">
          <nav className="container mx-auto flex justify-between">
            <div>
              <Link to="/" className="text-lg font-semibold hover:text-gray-200">
                Reminder App
              </Link>
            </div>
            <div className="space-x-4">
              <Link to="/" className="hover:text-gray-200">Home</Link>
              <Link to="/about" className="hover:text-gray-200">About</Link>
              {isAuthenticated ? (
                <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
              ) : (
                <>
                  <Link to="/register" className="hover:text-gray-200">Register</Link>
                  <Link to="/login" className="hover:text-gray-200">Login</Link>
                </>
              )}
            </div>
          </nav>
        </header>

        {/* Routing */}
        <main className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register onAuth={handleAuth} />} />
            <Route path="/login" element={<Login onAuth={handleAuth} />} />
            <Route path="/dashboard/add-task" element={isAuthenticated ? <AddTaskPage /> : <Navigate to="/" />} />
            <Route path="/dashboard/my-tasks" element={isAuthenticated ? <MyTasksPage /> : <Navigate to="/" />} />
         
  {/* ... other routes */}
  <Route path="/dashboard/completed-tasks" element={<CompletedTasksPage />} />


            {/* Protected route for dashboard */}
            <Route
  path="/dashboard"
  element={
    isAuthenticated ? <Dashboard /> : <Navigate to="/" />
  }
/>

          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
