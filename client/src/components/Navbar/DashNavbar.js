import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

export default function DashNavbar() {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand><b>Dashboard</b></Navbar.Brand>
      </Container>
    </Navbar>
  );
}
