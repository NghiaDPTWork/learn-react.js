import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container mt-5">
        <h1 className="text-center">PE FER202</h1>
        <p className="text-center">API URL: {import.meta.env.VITE_API_URL}</p>
        <div className="alert alert-success text-center">
          Project setup and API connection ready!
        </div>
      </div>
    </div>
  );
}

export default App;
