import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import MyNavbar from "./components/MyNavbar";
import StudentDetail from "./pages/StudentDetail";
import EditStudent from "./pages/EditStudent";
import AddStudent from "./pages/AddStudent";

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/management" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/student/:id" element={<StudentDetail />} />
        <Route path="/addStudent" element={<AddStudent />} />
        <Route path="/updateStudent/:id" element={<EditStudent />} />
      </Routes>
    </div>
  );
}

export default App;
