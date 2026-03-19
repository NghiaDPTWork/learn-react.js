import { Routes, Route } from "react-router";
import MyNavbar from "./components/MyNavbar";
import "./App.css";
import AllBooks from "./pages/AllBooks";
import ReadingBooks from "./pages/ReadingBooks";
import UnReadingBooks from "./pages/UnReadBooks";
import BookDetail from "./pages/BookDetail";

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <Routes>
        <Route path="/" element={<ReadingBooks />} />
        <Route path="/NghiaDPT/ReadingBooks" element={<ReadingBooks />} />
        <Route path="/NghiaDPT/AllBooks" element={<AllBooks />} />
        <Route path="/NghiaDPT/UnReadingBooks" element={<UnReadingBooks />} />
        <Route path="/NghiaDPT/BookDetail/:id" element={<BookDetail />} />
      </Routes>
    </div>
  );
}

export default App;
