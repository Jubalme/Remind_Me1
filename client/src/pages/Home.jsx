import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-cream-pink min-h-screen flex flex-col items-center justify-center text-purple-900">
      <h1 className="text-5xl font-bold mb-6">Welcome to Reminder App</h1>
      <p className="text-lg mb-8 max-w-2xl text-center">
        Stay organized and never miss an important task or event again! Our Reminder App helps you set reminders with ease, 
        keeping track of your daily schedule and important dates so that you can focus on what matters most. Start using our app today 
        and take control of your time!
      </p>
      <Link to="/register">
        <button className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition duration-300">
          Register Now
        </button>
      </Link>
    </div>
  );
};

export default Home;
