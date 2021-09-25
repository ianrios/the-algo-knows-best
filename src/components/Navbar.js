import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Container, Navbar, Nav } from 'react-bootstrap'

export default function NavbarModule() {
  return (
    <Navbar collapseOnSelect bg="light" fixed="top" expand="lg">
      <Container>
        <Navbar.Brand as={Link} className="navbar-brand fw-bold" eventKey="0" to='/'>
          The Algorithm Knows Best
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="nav-link" as={NavLink} eventKey="1" activeClassName="active" to="/home">
              Home
            </Nav.Link>
            <Nav.Link className="nav-link" as={NavLink} eventKey="2" activeClassName="active" to="/stream">
              Participate
            </Nav.Link>
            <Nav.Link className="nav-link" as={NavLink} eventKey="3" activeClassName="active" to="/results">
              Results
            </Nav.Link>
            <Nav.Link className="nav-link" as={NavLink} eventKey="4" activeClassName="active" to="/info">
              Info
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
