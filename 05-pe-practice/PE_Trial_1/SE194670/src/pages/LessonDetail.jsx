import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Container, Card, Button, Spinner, Badge } from "react-bootstrap";
import axios from "axios";

const LessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setLesson(response.data);
      } catch (error) {
        console.error("Error fetching lesson detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [API_URL, id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!lesson) {
    return (
      <Container className="text-center mt-5">
        <h3>Lesson not found!</h3>
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
      <Card className="shadow">
        <div className="row g-0">
          <div className="col-md-6">
            <Card.Img
              src={lesson.lessonImage}
              alt={lesson.lessonTitle}
              style={{ objectFit: "cover", height: "100%", minHeight: "300px" }}
            />
          </div>
          <div className="col-md-6">
            <Card.Body className="p-4">
              <Badge
                bg={lesson.isCompleted ? "success" : "warning"}
                className="mb-2"
              >
                {lesson.isCompleted ? "Completed" : "In Progress"}
              </Badge>
              <Card.Title as="h2" className="mb-3">
                {lesson.lessonTitle}
              </Card.Title>
              <hr />
              <div className="mb-3">
                <strong>Level:</strong>{" "}
                <Badge bg="info" className="ms-2">
                  {lesson.level}
                </Badge>
              </div>
              <div className="mb-3">
                <strong>Estimated Time:</strong>
                <span className="ms-2 text-primary fw-bold">
                  {lesson.estimatedTime?.toLocaleString()} minutes
                </span>
              </div>
              <p className="text-muted mt-4">
                This lesson is part of the JLPT {lesson.level} curriculum.
                Complete all sessions to master the language proficiency
                requirements.
              </p>
            </Card.Body>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default LessonDetail;
