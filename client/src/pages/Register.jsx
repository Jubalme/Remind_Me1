import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', // Updated to 'name'
    email: '',
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { name, email, username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Registration successful');
        navigate('/dashboard');
      } else {
        setMessage(result.message || 'Registration failed');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="bg-cream-pink min-h-screen flex flex-col items-center justify-center text-purple-900">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm">Name</label>
          <input
            type="text"
            id="name"
            name="name" // Updated to 'name'
            value={name}
            onChange={onChange}
            className="w-full p-2 border border-purple-400 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={onChange}
            className="w-full p-2 border border-purple-400 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            className="w-full p-2 border border-purple-400 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            className="w-full p-2 border border-purple-400 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition duration-300 w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
