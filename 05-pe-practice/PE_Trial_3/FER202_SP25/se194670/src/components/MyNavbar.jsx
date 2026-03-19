import { Link } from "react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const MyNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Books App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/NghiaDPT/ReadingBooks">
              Reading Books
            </Nav.Link>
            <Nav.Link as={Link} to="/NghiaDPT/AllBooks">
              All Books
            </Nav.Link>
            <Nav.Link as={Link} to="/NghiaDPT/UnReadingBooks">
              UnReading Books
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
