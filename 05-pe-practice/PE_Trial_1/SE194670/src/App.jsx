import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import AllLessons from "./pages/AllLessons";
import CompletedLessons from "./pages/CompletedLessons";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/se194670/all-lessons" element={<AllLessons />} />
        <Route
          path="/se194670/completed-lessons"
          element={<CompletedLessons />}
        />
        <Route
          path="/se194670/lessons/:id"
          element={<div>Lesson Detail Page (Task 3)</div>}
        />
      </Routes>
    </div>
  );
}

export default App;
