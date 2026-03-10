import Container from "react-bootstrap/Container";
import "./App.css";
import MyNavbar from "./components/MyNavbar";
import MyRoutes from "./components/MyRoutes";

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <MyRoutes />
    </div>
  );
}

export default App;
