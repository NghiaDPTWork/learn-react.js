import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";

const UnReadBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        const readingBooks = res.data.filter(
          (book) => String(book.bookReadingStatus) === "1",
        );
        setBooks(readingBooks);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
      });
  }, [API_URL]);

  const handleImageClick = (id) => {
    navigate(`/NghiaDPT/BookDetail/${id}`);
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
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.bookName}</td>
              <td
                onClick={() => navigate(`/NghiaDPT/BookDetail/${book.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={book.bookImage}
                  alt={book.bookName}
                  style={{
                    width: "50px",
                    height: "75px",
                    objectFit: "cover",
                  }}
                  onClick={() => handleImageClick(book.id)}
                />
              </td>
              <td>{book.bookType}</td>
              <td>{book.bookReadingStatus}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UnReadBooks;
