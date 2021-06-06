import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export function Locations (props) {
  console.log(props);
  return (
    <Container >
      <Row>
        <Col md={8}>
        {props.socketLocations.locations.length > 0 &&
  props.socketLocations.locations.map(loc => <div><p>Latitude: {loc.latitude}</p><p>Longitude: {loc.longitude}</p></div>)}
        </Col>
      </Row>
    </Container>
  )
}

// 