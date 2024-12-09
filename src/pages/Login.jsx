import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext"; // Import UserContext

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Access setUser from context

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3010/login", {
        username,
        password,
      });

      const userData = { username: username };
      setUser(userData); // Update the context with user data
      localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage

      alert(response.data.message);
      navigate("/Homepage"); // Redirect to homepage on success
    } catch (err) {
      setError(err.response?.data?.message || "Invalid username or password");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white min-h-screen flex items-center justify-center">
      <div className="bg-white text-gray-800 p-8 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Login
            </button>
            <a href="/register">
              <p className="underline text-sm mt-2">Create an account</p>
            </a>
            <a href="/Homepage">
              <p className="underline text-sm mt-2">Continue as Guest</p>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
