import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Container, Card, Button, Spinner, Badge } from "react-bootstrap";
import axios from "axios";

const ArtDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchart = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setArt(response.data);
      } catch (error) {
        console.error("Error fetching art detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchart();
  }, [API_URL, id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!art) {
    return (
      <Container className="text-center mt-5">
        <h3>art not found!</h3>
        <Button variant="primary" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Container>
    );
  }

// Task 5: Implement Art Detail page
  return (
    <Container className="mt-4 pb-5">
      <Button
        variant="outline-secondary"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        &larr; Back to List
      </Button>

      <div className="art-detail-container">
        {/* Ribbon for Glass Surface (True value) */}
        {(art.glassSurface === true || art.glassSurface === "true") && (
          <div className="ribbon-wrapper">
            <div className="ribbon">Glass Surface</div>
          </div>
        )}

        <div className="row g-0">
          <div className="col-lg-6">
            <img
              src={art.image}
              alt={art.artName}
              className="img-fluid"
              style={{
                width: "100%",
                height: "500px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
          <div className="col-lg-6 p-5">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h1 className="display-5 fw-bold text-dark mb-0">
                {art.artName}
              </h1>
              {art.limitedTimeDeal > 0 && (
                <span className="deal-badge">
                  Deal: {(art.limitedTimeDeal * 100).toFixed(0)}% OFF
                </span>
              )}
            </div>

            <div className="brand-section mb-4">
              <Badge bg="secondary" className="px-3 py-2 fs-6">
                Brand: {art.brand}
              </Badge>
            </div>

            <div className="price-section mb-4">
              <span className="text-muted fs-5 me-2">Price:</span>
              <span className="price-tag">${art.price}</span>
            </div>

            <hr />

            <div className="description-section mt-4">
              <h5 className="fw-bold mb-3">Description</h5>
              <p className="text-secondary lh-lg" style={{ fontSize: "1.1rem" }}>
                {art.description}
              </p>
            </div>

            <div className="additional-info mt-5 pt-4 border-top">
              <div className="mb-3">
                <span className="detail-label">Limited Time Deal:</span>
                <span className="fw-bold text-primary">
                  {art.limitedTimeDeal > 0
                    ? `${(art.limitedTimeDeal * 100).toFixed(0)}%`
                    : "No Deal"}
                </span>
              </div>
              <div>
                <span className="detail-label">Glass Surface:</span>
                <span
                  className={`fw-bold ${art.glassSurface ? "text-success" : "text-danger"}`}
                >
                  {art.glassSurface ? "Yes (Premium)" : "No"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ArtDetail;
