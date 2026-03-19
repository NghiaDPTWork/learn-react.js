import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      if (Array.isArray(response.data)) {
        const sortedBooks = [...response.data].sort((a, b) => b.id - a.id);
        setBooks(sortedBooks);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [API_URL]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("Book deleted successfully!");
        fetchBooks();
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("Failed to delete book.");
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">All Books</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td
                onClick={() => navigate(`/NghiaDPT/BookDetail/${book.id}`)}
                style={{ cursor: "pointer" }}
              >
                {book.bookName}
              </td>
              <td
                onClick={() => navigate(`/NghiaDPT/BookDetail/${book.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={book.bookImage}
                  alt={book.bookName}
                  style={{ width: "50px", height: "75px", objectFit: "cover" }}
                />
              </td>
              <td>{book.bookType}</td>
              <td>{book.bookReadingStatus}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate(`/NghiaDPT/UpdateBook/${book.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(book.id)}
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

export default AllBooks;
