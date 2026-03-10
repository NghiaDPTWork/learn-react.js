import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";

const CompletedLessons = () => {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(API_URL);
        const completedLessons = response.data.filter(
          (lesson) => lesson.isCompleted,
        );
        const sortedLessons = completedLessons.sort((a, b) => b.id - a.id);
        setLessons(sortedLessons);
      } catch (error) {
        console.error("Error fetching completed lessons:", error);
      }
    };
    fetchLessons();
  }, [API_URL]);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Completed JLPT Lessons</h2>
      <Table striped bordered hover responsive>
        <thead className="table-success">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Level</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <tr
              key={lesson.id}
              onClick={() => navigate(`/se194670/lessons/${lesson.id}`)}
              style={{ cursor: "pointer" }}
            >
              <td>{lesson.id}</td>
              <td>{lesson.lessonTitle}</td>
              <td>{lesson.level}</td>
              <td>
                <img
                  src={lesson.lessonImage}
                  alt={lesson.lessonTitle}
                  style={{ height: "50px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CompletedLessons;
