import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
  };

  return (
    <Container className="mt-5 pb-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">Contact Us</h1>
        <p className="lead text-muted">We'd love to hear from you. Send us a message or find our location.</p>
      </div>

      <Row className="g-4">
        {/* Contact info column */}
        <Col lg={4}>
          <Card className="h-100 border-0 shadow-sm p-4 bg-primary text-white">
            <h3 className="mb-4">Get In Touch</h3>
            
            <div className="mb-4">
              <h5>📍 Address</h5>
              <p className="mb-0">FPT University, Hoa Lac High-Tech Park,<br />Hanoi, Vietnam</p>
            </div>

            <div className="mb-4">
              <h5>📞 Phone</h5>
              <p className="mb-0">+84 123 456 789</p>
            </div>

            <div className="mb-4">
              <h5>✉️ Email</h5>
              <p className="mb-0">support@artapp.vps</p>
            </div>

            <div className="mt-auto">
              <h5>🕒 Opening Hours</h5>
              <p className="mb-0">Mon - Fri: 9:00 AM - 5:00 PM</p>
              <p className="mb-0">Sat: 10:00 AM - 2:00 PM</p>
            </div>
          </Card>
        </Col>

        {/* Contact form column */}
        <Col lg={8}>
          <Card className="h-100 border-0 shadow-sm p-4">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="formName">
                    <Form.Label className="fw-bold">Your Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" required />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="formEmail">
                    <Form.Label className="fw-bold">Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="formSubject">
                <Form.Label className="fw-bold">Subject</Form.Label>
                <Form.Control type="text" placeholder="What's this about?" />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formMessage">
                <Form.Label className="fw-bold">Message</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Write your message here..." required />
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" size="lg" type="submit">
                  Send Message
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>

      {/* Placeholder for Map */}
      <div className="mt-5 rounded shadow-sm overflow-hidden" style={{ height: "300px", background: "#e9ecef" }}>
        <div className="h-100 d-flex align-items-center justify-content-center text-muted">
          <div className="text-center">
            <span style={{ fontSize: "3rem" }}>🗺️</span>
            <p className="mt-2">Google Maps Placeholder</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
