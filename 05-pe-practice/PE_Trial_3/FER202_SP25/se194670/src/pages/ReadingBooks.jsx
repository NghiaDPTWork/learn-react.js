import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";

const ReadingBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        const readingBooks = res.data.filter(
          (book) => String(book.bookReadingStatus) === "2",
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
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold text-dark border-bottom border-3 border-primary pb-2">
          Reading Books
        </h1>
        <span className="badge bg-primary rounded-pill px-3 py-2">
          {books.length} Books
        </span>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted fs-4">No books currently being read.</p>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {books.map((book) => (
            <Col key={book.id}>
              <Card className="h-100 shadow-sm border-0 transition-hover">
                <div className="overflow-hidden" style={{ height: "300px" }}>
                  <Card.Img
                    variant="top"
                    src={book.bookImage}
                    alt={book.bookName}
                    style={{
                      cursor: "pointer",
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                    onClick={() => handleImageClick(book.id)}
                    className="book-thumbnail"
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-primary fw-bold mb-2">
                    {book.bookName}
                  </Card.Title>
                  <Card.Text className="text-muted small mb-3">
                    <span className="fw-semibold">Type: </span>
                    <span className="badge bg-light text-dark border">
                      {book.bookType}
                    </span>
                  </Card.Text>
                  <div className="mt-auto pt-3 border-top">
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">Reading Status:</small>
                      <span className="badge bg-success-subtle text-success border border-success-subtle px-2">
                        {book.bookReadingStatus}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <style>{`
        .transition-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .transition-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .book-thumbnail:hover {
          transform: scale(1.05);
        }
      `}</style>
    </Container>
  );
};

export default ReadingBooks;
