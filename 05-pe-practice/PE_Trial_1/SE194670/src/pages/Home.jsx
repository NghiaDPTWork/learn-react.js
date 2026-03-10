import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";

const Home = () => {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(API_URL);
        const uncompletedLessons = response.data.filter(
          (lesson) => !lesson.isCompleted,
        );
        setLessons(uncompletedLessons);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };
    fetchLessons();
  }, [API_URL]);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Uncompleted JLPT Lessons</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {lessons.map((lesson) => (
          <Col key={lesson.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={lesson.lessonImage}
                alt={lesson.lessonTitle}
                style={{
                  cursor: "pointer",
                  height: "200px",
                  objectFit: "cover",
                }}
                onClick={() => navigate(`/se194670/lessons/${lesson.id}`)}
              />
              <Card.Body>
                <Card.Title
                  className="text-truncate"
                  title={lesson.lessonTitle}
                >
                  {lesson.lessonTitle}
                </Card.Title>
                <Card.Text>
                  <strong>Level:</strong> {lesson.level} <br />
                  <strong>Estimated Time:</strong> {lesson.estimatedTime} mins
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
