import { useEffect } from "react";
import { Container } from "react-bootstrap";

const Home = () => {
  // const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://69057f5cee3d0d14c132c76a.mockapi.io/se194670",
        );
        const data = await response.json();
        console.log("Fetched lessons:", data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className="mt-4">
      <h1>Home</h1>
      <p>Welcome to the Lesson Management System</p>
    </Container>
  );
};

export default Home;
