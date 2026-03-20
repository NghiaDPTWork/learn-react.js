import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";

const Dashboard = () => {
  const [Students, setStudents] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let isMounted = true;
    const fetchStudents = async () => {
      try {
        const response = await axios.get(API_URL);
        if (isMounted && Array.isArray(response.data)) {
          const sortedStudents = [...response.data].sort((a, b) => b.id - a.id);
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

  const fetchUpdatedList = async () => {
    try {
      const response = await axios.get(API_URL);
      if (Array.isArray(response.data)) {
        setStudents(response.data);
      }
    } catch (error) {
      console.error("Error refreshing Students:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Student?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("Student deleted successfully!");
        fetchUpdatedList();
      } catch (error) {
        console.error("Error deleting Student:", error);
        alert("Failed to delete Student.");
      }
    }
  };
  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student Management</h2>
        <Button variant="primary" onClick={() => navigate("/addStudent")}>Add New Student</Button>
      </div>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>
                <img
                  src={student.image}
                  alt={student.name}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
              <td>{student.name}</td>
              <td>{student.dateofbirth}</td>
              <td>{student.gender == true || student.gender == "true" ? "Male" : "Female"}</td>
              <td>{student.class}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate(`/student/${student.id}`)}
                >
                  Detail
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate(`/updateStudent/${student.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(student.id)}
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

export default Dashboard;
