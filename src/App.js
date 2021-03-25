import React, { useState, useEffect } from 'react';
import {Map} from './Components/Map'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import './App.css';

function getLocation() {
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position) {
      postToSheet(position.coords)
    });
  }
}

function postToSheet(coordinates) {
  // other elements: , accuracy, altitudeAccuracy, heading, speed
  const { latitude, longitude, altitude } = coordinates
  
  const data = {
    latitude,
    longitude,
    altitude,
    created: new Date(),
  }
  // GeolocationCoordinates { latitude: 33.7227231111664, longitude: -111.9814122972247, altitude: 536.8526000976562, accuracy: 65, altitudeAccuracy: 10, heading: null, speed: null 
  // };
  console.log('coordinates: ', coordinates)
  //     https://sheet.best/api/sheets/4c086f74-07ab-4df1-9f49-deca951cf937
  fetch("https://sheet.best/api/sheets/4c086f74-07ab-4df1-9f49-deca951cf937", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
})
  .then((r) => r.json())
  .then((response) => {
    // The response comes here
    console.log(response);
  })
  .catch((error) => {
    // Errors are reported there
    console.log(error);
  });
}

// const [usersLocations, setUsersLocations] = useState(usersLocationsArr)
function App() {
  getLocation();
  const [usersLocations, setUsersLocations] = useState([])
  function getUsersLocations() {
    return fetch("https://sheet.best/api/sheets/4c086f74-07ab-4df1-9f49-deca951cf937")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setUsersLocations(data)
    })
    .catch((error) => {
      console.error(error);
    });
  }
  const [isLoading, setLoading] = useState(false);
  
  useEffect(() => {
    if (isLoading) {
      getUsersLocations().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleLoadClick = () => setLoading(true);
  const handleClearClick = () => setUsersLocations([true]);
// <Map />
//  <Nav className="justify-space-between" activeKey="/home" >
{/* <Nav.Item>
<Nav.Link href="/home">Home</Nav.Link>
</Nav.Item>
<Nav.Item>
<Nav.Link eventKey="disabled" disabled>
Disabled
</Nav.Link>
</Nav.Item>
</Nav> */}
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
          disabled={isLoading}
          onClick={!isLoading ? handleLoadClick : null}
        >
      {isLoading ? 'Loading…' : 'Show Locations'}
      </Button>
      <Button variant="light" onClick={handleClearClick} >Clear Locations</Button>
      {usersLocations.length > 0 &&
      usersLocations.map(loc => <div><p>Latitude: {loc.latitude}</p><p>Longitude: {loc.longitude}</p><p>Altitude: {loc.altitude}</p></div>)}
      
        
      </main>
    </Container>
    </div>
      
  );
}

export default App;
