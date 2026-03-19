import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";

const ArtTool = () => {
  const [art, setArts] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let isMounted = true;
    const fetchArts = async () => {
      try {
        const response = await axios.get(API_URL);
        if (isMounted && Array.isArray(response.data)) {
          const sortedArts = [...response.data].sort((a, b) => b.id - a.id);
          setArts(sortedArts);
        }
      } catch (error) {
        console.error("Error fetching Arts:", error);
      }
    };

    fetchArts();
    return () => {
      isMounted = false;
    };
  }, [API_URL]);

  const fetchUpdatedList = async () => {
    try {
      const response = await axios.get(API_URL);
      if (Array.isArray(response.data)) {
        const sortedArts = [...response.data].sort((a, b) => b.id - a.id);
        setArts(sortedArts);
      }
    } catch (error) {
      console.error("Error refreshing Arts:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this art?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("art deleted successfully!");
        fetchUpdatedList();
      } catch (error) {
        console.error("Error deleting art:", error);
        alert("Failed to delete art.");
      }
    }
  };

  return (
    <Container className="mt-4 pb-5">
      <h2 className="text-center mb-4">Management Art Tools</h2>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Brands</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {art.map((art) => (
            <tr key={art.id} style={{ verticalAlign: "middle" }}>
              <td>{art.id}</td>
              <td>
                <img
                  src={art.image}
                  alt={art.artName}
                  style={{
                    width: "80px",
                    height: "60px",
                    objectFit: "cover",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                  title="Click to Update"
                  onClick={() => navigate(`/se194670/update-art/${art.id}`)}
                />
              </td>
              <td>
                <span
                  style={{ cursor: "pointer", color: "#0d6efd" }}
                  onClick={() => navigate(`/se194670/artDetail/${art.id}`)}
                >
                  {art.artName}
                </span>
              </td>
              <td>${art.price}</td>
              <td>{art.brand}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate(`/se194670/update-art/${art.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(art.id)}
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

export default ArtTool;
