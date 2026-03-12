import React from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddLesson = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const formik = useFormik({
    initialValues: {
      lessonTitle: "",
      lessonImage: "",
      level: "N5",
      isCompleted: false,
      estimatedTime: 0,
    },
    validationSchema: Yup.object({
      lessonTitle: Yup.string()
        .required("Title is required")
        .test("is-more-than-one-word", "Title must contain more than 1 word", (value) => {
          return value && value.trim().split(/\s+/).length > 1;
        }),
      lessonImage: Yup.string().url("Must be a valid URL").required("Image URL is required"),
      level: Yup.string().required("Level is required"),
      estimatedTime: Yup.number()
        .typeError("Must be a number")
        .positive("Must be positive")
        .required("Time is required"),
      isCompleted: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(API_URL, values);
        alert("Lesson added successfully!");
        navigate("/se194670/all-lessons");
      } catch (error) {
        console.error("Error adding lesson:", error);
        alert("Failed to add lesson.");
      }
    },
  });

  return (
    <Container className="mt-4">
      <Row justify-content-center="true">
        <Col md={8}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">Add New Lesson</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Lesson Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="lessonTitle"
                    placeholder="Enter lesson title (e.g. Kanji Master)"
                    {...formik.getFieldProps("lessonTitle")}
                    isInvalid={formik.touched.lessonTitle && !!formik.errors.lessonTitle}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.lessonTitle}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Lesson Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="lessonImage"
                    placeholder="https://example.com/image.jpg"
                    {...formik.getFieldProps("lessonImage")}
                    isInvalid={formik.touched.lessonImage && !!formik.errors.lessonImage}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.lessonImage}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Level</Form.Label>
                      <Form.Select
                        name="level"
                        {...formik.getFieldProps("level")}
                        isInvalid={formik.touched.level && !!formik.errors.level}
                      >
                        <option value="N1">N1</option>
                        <option value="N2">N2</option>
                        <option value="N3">N3</option>
                        <option value="N4">N4</option>
                        <option value="N5">N5</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.level}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Estimated Time (mins)</Form.Label>
                      <Form.Control
                        type="number"
                        name="estimatedTime"
                        {...formik.getFieldProps("estimatedTime")}
                        isInvalid={formik.touched.estimatedTime && !!formik.errors.estimatedTime}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.estimatedTime}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="isCompleted-switch"
                    label="Is Completed?"
                    name="isCompleted"
                    checked={formik.values.isCompleted}
                    onChange={formik.handleChange}
                  />
                </Form.Group>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Button variant="secondary" onClick={() => navigate(-1)} className="me-md-2">
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Add Lesson
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddLesson;
