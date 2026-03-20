import React, { useState, useEffect } from "react";
import { Container, Table, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";

const Home = () => {
  const [Students, setStudents] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let isMounted = true;
    const fetchStudents = async () => {
      try {
        const response = await axios.get(API_URL);
        if (isMounted && Array.isArray(response.data)) {
          const sortedStudents = [...response.data].sort((a, b) => 
            a.name.localeCompare(b.name)
          );
          setStudents(sortedStudents);
        }
      } catch (error) {
        console.error("Error fetching Students:", error);
      }
    };

    fetchStudents();
    return () => {
      isMounted = false;
    };
  }, [API_URL]);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Student List</h2>
      <div className="row">
        {Students.map((student) => (
          <div key={student.id} className="col-md-4 mb-4">
            <Card className="h-100 shadow-sm" onClick={() => navigate(`/student/${student.id}`)} style={{ cursor: "pointer" }}>
              <Card.Img variant="top" src={student.image} alt={student.name} style={{ height: "200px", objectFit: "cover" }} />
              <Card.Body>
                <Card.Title>{student.name}</Card.Title>
                <Card.Text>
                  <strong>ID:</strong> {student.id} <br />
                  <strong>DOB:</strong> {student.dateofbirth} <br />
                  <strong>Gender:</strong> {student.gender == true || student.gender == "true" ? "Male" : "Female"} <br />
                  <strong>Class:</strong> {student.class}
                </Card.Text>
                <Button variant="info" onClick={() => navigate(`/student/${student.id}`)}>Detail</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Home;
