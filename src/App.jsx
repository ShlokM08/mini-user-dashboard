import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

function SignIn({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name, email });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

function Dashboard({ user }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch("https://api.weatherapi.com/v1/current.json?key=5b4fbc8df99542db90793441250108&q=Mumbai")
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          city: data.location.name,
          temp: data.current.temp_c,
          condition: data.current.condition.text,
          icon: data.current.condition.icon,
        });
      });
  }, []);

  if (!user) return <p className="text-center mt-10 text-lg text-gray-700">Please sign in first.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800">Welcome, {user.name}!</h2>
        {weather && (
          <div className="mt-6 bg-blue-100 p-4 rounded-lg shadow-inner flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-blue-800">{weather.city}</h3>
              <p className="text-blue-700">{weather.temp}°C – {weather.condition}</p>
            </div>
            <img src={weather.icon} alt="Weather icon" className="w-12 h-12" />
          </div>
        )}
        <Link
          to="/profile"
          className="mt-6 inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md transition"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}

function Profile({ user, setUser }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    setUser({ name, email });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Profile</h2>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-md transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
