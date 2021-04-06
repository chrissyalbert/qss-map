import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export function About(props) {
  return (
    <Container fluid>
      <Row>
        <Col md={8}>
          <header>
            <h2>About Us</h2>
          </header>
        </Col>
      </Row>
    </Container>
  )
}