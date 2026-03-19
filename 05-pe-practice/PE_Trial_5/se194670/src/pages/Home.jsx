import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";

const Home = () => {
  const [arts, setarts] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchArts = async () => {
      try {
        const response = await axios.get(API_URL);
        const uncompletedarts = response.data.filter(
          (art) => art.limitedTimeDeal == 0,
        );
        setarts(uncompletedarts);
      } catch (error) {
        console.error("Error fetching arts:", error);
      }
    };
    fetchArts();
  }, [API_URL]);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Collection JLPT arts</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {arts.map((art) => (
          <Col key={art.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={art.image}
                alt={art.brand}
                style={{
                  cursor: "pointer",
                  height: "200px",
                  objectFit: "cover",
                }}
                onClick={() => navigate(`/se194670/artDetail/${art.id}`)}
              />
              <Card.Body>
                <Card.Title className="text-truncate" title={art.artName}>
                  {art.artName}
                </Card.Title>
                <Card.Text>
                  <strong>Price:</strong> {art.price} <br />
                  <strong>Description:</strong> {art.description} mins
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
