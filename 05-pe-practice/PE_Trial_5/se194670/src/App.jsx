import { Routes, Route } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import ArtTool from "./pages/ArtTool";
import Contact from "./pages/Contact";
import MyNavbar from "./components/MyNavbar";
import ArtDetail from "./pages/ArtDetail";
import UpdateArt from "./pages/UpdateArt";

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/se194670/art-tool" element={<ArtTool />} />
        <Route path="/se194670/contact" element={<Contact />} />
        <Route path="/se194670/artDetail/:id" element={<ArtDetail />} />
        {/* <Route path="/se194670/add-lesson" element={<AddLesson />} /> */}
        <Route path="/se194670/update-art/:id" element={<UpdateArt />} />
      </Routes>
    </div>
  );
}

export default App;
