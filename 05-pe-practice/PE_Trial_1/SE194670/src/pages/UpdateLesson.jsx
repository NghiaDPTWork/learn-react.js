import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UpdateLesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(true);

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
        await axios.put(`${API_URL}/${id}`, values);
        alert("Lesson updated successfully!");
        navigate("/se194670/all-lessons");
      } catch (error) {
        console.error("Error updating lesson:", error);
        alert("Failed to update lesson.");
      }
    },
  });

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        const data = response.data;
        formik.setValues({
          lessonTitle: data.lessonTitle || "",
          lessonImage: data.lessonImage || "",
          level: data.level || "N5",
          isCompleted: data.isCompleted || false,
          estimatedTime: data.estimatedTime || 0,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching lesson:", error);
        alert("Failed to fetch lesson details.");
        navigate("/se194670/all-lessons");
      }
    };
    fetchLesson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, API_URL]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Header className="bg-warning text-dark">
              <h3 className="mb-0">Update Lesson</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Lesson Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="lessonTitle"
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
                  <Button variant="warning" type="submit">
                    Update Lesson
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

export default UpdateLesson;
