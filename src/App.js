import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Homepage from "./pages/Homepage";
import MangaOverview from "./pages/MangaOverview";
import ChapterReader from "./pages/ChapterReader";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserProvider from "./context/UserContext"; // Import UserProvider

function App() {
  return (
    // Use UserProvider to wrap the Router and make user context available throughout the app
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/manga/:id" element={<MangaOverview />} />
          <Route path="/chapter/:chapterId" element={<ChapterReader />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
