import React from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

export function Home (props) {
  props.getLocation()
  return (
    <div className="landing" >
      <Container className="App d-flex h-100 mx-auto flex-column">
      <header className="masthead mb-auto">
        <div className="inner">
          <h3 className="masthead-brand text-light">Light the World</h3>
        </div>
      </header>
      <main role="main" className="inner cover">
        <h1 className="cover-heading">Unleash your Light</h1>
        <p className="lead">Click "Allow Location Access" at the prompt from your browser so that your light can be seen by all our community.</p>
        
        <Button
          variant="light"
          disabled={props.isLoading}
          onClick={!props.isLoading ? props.handleLoadClick : null}
        >
      {props.isLoading ? 'Loading…' : 'Show Locations'}
      </Button>
      <Button variant="light" onClick={props.handleClearClick} >Clear Locations</Button>
      {props.usersLocations.locations.length > 0 && props.showLocations &&
      props.usersLocations.locations.map(loc => <div><p>Latitude: {loc.latitude}</p><p>Longitude: {loc.longitude}</p></div>)}
      </main>
    </Container>
    </div>
  )
} 
// (props.usersLocations.length > 0 ) && && props.showLocations