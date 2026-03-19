import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Container, Form, Button, Row, Col, Spinner, Card } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const UpdateArt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setInitialData(response.data);
      } catch (error) {
        console.error("Error fetching art:", error);
        alert("Could not load art data.");
        navigate("/se194670/art-tool");
      } finally {
        setLoading(false);
      }
    };
    fetchArt();
  }, [id, API_URL, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      artName: initialData?.artName || "",
      price: initialData?.price || 0,
      description: initialData?.description || "",
      glassSurface: initialData?.glassSurface || false,
      image: initialData?.image || "",
      brand: initialData?.brand || "KingArt",
      limitedTimeDeal: initialData?.limitedTimeDeal || 0,
    },
    validationSchema: Yup.object({
      artName: Yup.string()
        .required("Art name is required")
        .test("is-more-than-one-word", "Must be more than 1 word", (value) => {
          return value ? value.trim().split(/\s+/).length > 1 : false;
        })
        .test("is-lowercase", "Must be all lowercase", (value) => {
          return value ? value === value.toLowerCase() : false;
        }),
      price: Yup.number()
        .required("Price is required")
        .min(10, "Price must be at least 10"),
      description: Yup.string().required("Description is required"),
      image: Yup.string()
        .required("Image URL is required")
        .url("Must be a valid URL"),
      brand: Yup.string().required("Brand is required"),
      glassSurface: Yup.boolean(),
      limitedTimeDeal: Yup.number().min(0).max(1),
    }),
    onSubmit: async (values) => {
      try {
        await axios.put(`${API_URL}/${id}`, values);
        alert("Art updated successfully!");
        navigate("/se194670/art-tool");
      } catch (error) {
        console.error("Error updating art:", error);
        alert("Failed to update art.");
      }
    },
  });

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4 pb-5">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-primary text-white text-center py-3">
          <h2 className="mb-0">Update Art Tool</h2>
        </Card.Header>
        <Card.Body className="p-4">
          <Form onSubmit={formik.handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="artName">
                <Form.Label className="fw-bold text-secondary">Art Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. digital painting tool"
                  {...formik.getFieldProps("artName")}
                  isInvalid={formik.touched.artName && !!formik.errors.artName}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.artName}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  More than 1 word, all lowercase.
                </Form.Text>
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="price">
                <Form.Label className="fw-bold text-secondary">Price ($)</Form.Label>
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("price")}
                  isInvalid={formik.touched.price && !!formik.errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label className="fw-bold text-secondary">Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://example.com/image.jpg"
                {...formik.getFieldProps("image")}
                isInvalid={formik.touched.image && !!formik.errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.image}
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="brand">
                <Form.Label className="fw-bold text-secondary">Brand</Form.Label>
                <Form.Select
                  {...formik.getFieldProps("brand")}
                  isInvalid={formik.touched.brand && !!formik.errors.brand}
                >
                  <option value="KingArt">KingArt</option>
                  <option value="Color Splash">Color Splash</option>
                  <option value="Edding">Edding</option>
                  <option value="Arteza">Arteza</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.brand}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="glassSurface" className="d-flex align-items-center mt-4">
                <Form.Check
                  type="switch"
                  label="Glass Surface"
                  className="fw-bold text-secondary"
                  checked={formik.values.glassSurface}
                  onChange={(e) => formik.setFieldValue("glassSurface", e.target.checked)}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-4" controlId="description">
              <Form.Label className="fw-bold text-secondary">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                {...formik.getFieldProps("description")}
                isInvalid={formik.touched.description && !!formik.errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit" className="px-5">
                Update Art
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/se194670/art-tool")}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UpdateArt;
