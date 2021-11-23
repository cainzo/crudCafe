
import { Navbar, Nav, Container } from "react-bootstrap";
import {Link} from 'react-router-dom';
import React from 'react';

const Navigation = () => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
        <Container>
          <Link to="/" className='navbar-brand'>CRUD Cafe</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to='/' className='nav-link'>Inicio</Link>
              <Link to='/productos' className='nav-link'>Productos</Link>
              <Link to='*' className='nav-link'>Extra</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default Navigation;