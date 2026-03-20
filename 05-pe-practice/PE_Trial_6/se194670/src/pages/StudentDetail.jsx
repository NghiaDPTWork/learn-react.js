import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Container, Card, Button, Spinner, Badge } from "react-bootstrap";
import axios from "axios";

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching Student detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [API_URL, id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!Student) {
    return (
      <Container className="text-center mt-5">
        <h3>Student not found!</h3>
        <Button variant="primary" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Button
        variant="outline-secondary"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </Button>
      <Card className="shadow-sm">
        <div className="row g-0">
          <div className="col-md-5">
            <Card.Img
              src={Student.image}
              alt={Student.name}
              style={{ objectFit: "cover", height: "100%", maxHeight: "500px" }}
            />
          </div>
          <div className="col-md-7">
            <Card.Body className="p-4">
              <h2 className="mb-4">Student Details</h2>
              <hr />
              <p><strong>ID:</strong> {Student.id}</p>
              <p><strong>Name:</strong> {Student.name}</p>
              <p><strong>Date of Birth:</strong> {Student.dateofbirth}</p>
              <p><strong>Gender:</strong> {Student.gender == true || Student.gender == "true" ? "Male" : "Female"}</p>
              <p><strong>Class:</strong> {Student.class}</p>
              <p><strong>Feedback:</strong> {Student.feedback || "No feedback available"}</p>
              <hr />
              <Button variant="warning" onClick={() => navigate(`/updateStudent/${Student.id}`)}>Edit Info</Button>
            </Card.Body>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default StudentDetail;
