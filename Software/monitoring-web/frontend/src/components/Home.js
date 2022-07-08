import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Home() {
  // URL history
  const navigate = useNavigate();

  // function to handle click
  function HandleClick(e) {
    // alert("se presiono la etiqueta");
    // console.log(e.target.id);

    if (e.target.id === "1") {
      navigate("/dataQueryEvent");
    }
    if (e.target.id === "2") {
      navigate("/dataQuerySample");
    }
  }

  return (
    <div>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="/">Home Monitoring</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="me-auto">
            <Nav.Link id="1" onClick={(e) => HandleClick(e)}>
              Ingrese a Eventos
            </Nav.Link>
            <Nav.Link id="2" onClick={(e) => HandleClick(e)}>
              Ingrese a Muestras
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
