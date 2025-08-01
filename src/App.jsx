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
    <div className="p-4 max-w-md mx-auto mt-10 shadow-lg rounded-xl bg-white">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input className="p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input className="p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign In</button>
      </form>
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

  if (!user) return <p className="text-center mt-10">Please sign in first.</p>;

  return (
    <div className="p-4 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold">Welcome, {user.name}!</h2>
      {weather && (
        <div className="mt-6 p-4 border rounded bg-blue-50">
          <h3 className="text-lg font-bold">Weather in {weather.city}</h3>
          <div className="flex items-center gap-2">
            <img src={weather.icon} alt="weather icon" />
            <p>{weather.temp}°C – {weather.condition}</p>
          </div>
        </div>
      )}
      <Link to="/profile" className="mt-4 inline-block text-blue-600">Edit Profile</Link>
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
    <div className="p-4 max-w-md mx-auto mt-10 shadow-md bg-white rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleUpdate} className="flex flex-col gap-3">
        <input className="p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Update</button>
      </form>
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
