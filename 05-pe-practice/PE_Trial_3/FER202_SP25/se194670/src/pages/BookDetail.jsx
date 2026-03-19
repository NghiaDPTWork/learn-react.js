import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Placeholder,
} from "react-bootstrap";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error("Error fetching book details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [API_URL, id]);

  if (loading) {
    return (
      <Container className="mt-5">
        <Row>
          <Col md={4}>
            <Placeholder as={Card} animation="glow">
              <Placeholder xs={12} style={{ height: "450px" }} />
            </Placeholder>
          </Col>
          <Col md={8}>
            <Placeholder as="div" animation="glow">
              <Placeholder xs={7} size="lg" className="mb-4" />
              <Placeholder xs={12} />
              <Placeholder xs={10} />
              <Placeholder xs={8} />
            </Placeholder>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container className="mt-5 text-center">
        <h2>Book not found</h2>
        <Button variant="primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5 py-4">
      <Row className="justify-content-center">
        <Col md={4} className="mb-4">
          <Card className="shadow-lg border-0">
            <Card.Img variant="top" src={book.bookImage} alt={book.bookName} />
          </Card>
        </Col>
        <Col md={7} className="ps-md-5">
          <div className="mb-4">
            <span className="badge bg-info text-dark mb-2 px-3">
              {book.bookType}
            </span>
            <h1 className="fw-bold mb-3">{book.bookName}</h1>
            <hr className="my-4" />
          </div>

          <div className="mb-4">
            <h5 className="text-secondary mb-3">Reading Progress</h5>
            <div className="d-flex align-items-center mb-2">
              <span className="me-3 fw-bold">Status:</span>
              <span
                className={`badge ${book.bookReadingStatus == 2 ? "bg-success" : "bg-warning"}`}
              >
                {book.bookReadingStatus == 1
                  ? "Unread"
                  : book.bookReadingStatus == 2
                    ? "Reading"
                    : book.bookReadingStatus == 3
                      ? "Read"
                      : "Unknown"}
              </span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <span className="me-3 fw-bold">Unread:</span>
              <span
                className={`badge ${book.isUnread ? "bg-danger" : "bg-secondary"}`}
              >
                {book.isUnread ? "Yes" : "No"}
              </span>
            </div>
          </div>

          <div className="mt-5">
            <Button
              variant="outline-primary"
              className="px-4 me-3"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left me-2"></i> Back
            </Button>
            {book.bookReadingStatus == 2 && (
              <Button variant="success" className="px-4">
                Continue Reading
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BookDetail;
