import { Routes, Route } from "react-router";
import MyNavbar from "./components/MyNavbar";
import Home from "./pages/Home";
import AllLessons from "./pages/AllLessons";
import CompletedLessons from "./pages/CompletedLessons";
import LessonDetail from "./pages/LessonDetail";
import AddLesson from "./pages/AddLesson";
import UpdateLesson from "./pages/UpdateLesson";
import "./App.css";

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/se194670/all-lessons" element={<AllLessons />} />
        <Route
          path="/se194670/completed-lessons"
          element={<CompletedLessons />}
        />
        <Route path="/se194670/lessons/:id" element={<LessonDetail />} />
        <Route path="/se194670/add-lesson" element={<AddLesson />} />
        <Route path="/se194670/update-lesson/:id" element={<UpdateLesson />} />
      </Routes>
    </div>
  );
}

export default App;
