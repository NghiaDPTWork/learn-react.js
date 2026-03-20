import React from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddStudent = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      dateofbirth: "",
      gender: true,
      class: "",
      feedback: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .test("word-count", "Name must be more than 2 words", (value) => 
          value && value.trim().split(/\s+/).length > 2
        ),
      image: Yup.string().url("Must be a valid URL").required("Image URL is required"),
      dateofbirth: Yup.date().required("Date of birth is required"),
      gender: Yup.boolean().required(),
      class: Yup.string().required("Class is required"),
      feedback: Yup.string().required("Feedback is required"),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          gender: values.gender === "true" || values.gender === true,
        };
        await axios.post(API_URL, payload);
        alert("Student added successfully!");
        navigate("/management");
      } catch (error) {
        console.error("Error adding Student:", error);
        alert("Failed to add Student.");
      }
    },
  });

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0 text-center">Add New Student</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...formik.getFieldProps("name")}
                    isInvalid={formik.touched.name && !!formik.errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    {...formik.getFieldProps("image")}
                    isInvalid={formik.touched.image && !!formik.errors.image}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.image}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    {...formik.getFieldProps("dateofbirth")}
                    isInvalid={formik.touched.dateofbirth && !!formik.errors.dateofbirth}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.dateofbirth}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select {...formik.getFieldProps("gender")}>
                    <option value={true}>Male</option>
                    <option value={false}>Female</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Class</Form.Label>
                  <Form.Control
                    type="text"
                    {...formik.getFieldProps("class")}
                    isInvalid={formik.touched.class && !!formik.errors.class}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.class}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Feedback</Form.Label>
                  <Form.Select
                    {...formik.getFieldProps("feedback")}
                    isInvalid={formik.touched.feedback && !!formik.errors.feedback}
                  >
                    <option value="">Select Feedback</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Poor">Poor</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{formik.errors.feedback}</Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">Add Student</Button>
                  <Button variant="secondary" onClick={() => navigate("/management")}>Cancel</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddStudent;
