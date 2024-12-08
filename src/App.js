import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Homepage from "./pages/Homepage";
import MangaOverview from "./pages/MangaOverview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/manga/:id" element={<MangaOverview />} />
      </Routes>
    </Router>
  );
}

export default App;
