import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";

const AllLessons = () => {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let isMounted = true;
    const fetchLessons = async () => {
      try {
        const response = await axios.get(API_URL);
        if (isMounted && Array.isArray(response.data)) {
          const sortedLessons = [...response.data].sort((a, b) => b.id - a.id);
          setLessons(sortedLessons);
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
    return () => {
      isMounted = false;
    };
  }, [API_URL]);

  const fetchUpdatedList = async () => {
    try {
      const response = await axios.get(API_URL);
      if (Array.isArray(response.data)) {
        const sortedLessons = [...response.data].sort((a, b) => b.id - a.id);
        setLessons(sortedLessons);
      }
    } catch (error) {
      console.error("Error refreshing lessons:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("Lesson deleted successfully!");
        fetchUpdatedList();
      } catch (error) {
        console.error("Error deleting lesson:", error);
        alert("Failed to delete lesson.");
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">All JLPT Lessons</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Level</th>
            <th>Time (mins)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson.id} style={{ cursor: "pointer" }}>
              <td onClick={() => navigate(`/se194670/lessons/${lesson.id}`)}>
                {lesson.id}
              </td>
              <td onClick={() => navigate(`/se194670/lessons/${lesson.id}`)}>
                {lesson.lessonTitle}
              </td>
              <td onClick={() => navigate(`/se194670/lessons/${lesson.id}`)}>
                {lesson.level}
              </td>
              <td onClick={() => navigate(`/se194670/lessons/${lesson.id}`)}>
                {lesson.estimatedTime}
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/se194670/update-lesson/${lesson.id}`);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(lesson.id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AllLessons;
