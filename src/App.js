import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Homepage from "./pages/Homepage";
import MangaOverview from "./pages/MangaOverview";
import ChapterReader from "./pages/ChapterReader";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/manga/:id" element={<MangaOverview />} />
        <Route path="/chapter/:chapterId" element={<ChapterReader />} />
      </Routes>
    </Router>
  );
}

export default App;
