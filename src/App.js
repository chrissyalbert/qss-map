import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import  io  from "socket.io-client";

import './App.css';
import axios from 'axios'

const ioClient = io("https://quiet-plateau-57365.herokuapp.com/");
ioClient.on("connect", () => {
      console.log(ioClient.id); // x8WIv7-mJelg7on_ALbx
    });

function App() {
  function getLocation() {
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position) {
        postToMongoDBAtlas(position.coords)
      });
    }
  }
  
  function postToMongoDBAtlas(coordinates) {
    const { latitude, longitude} = coordinates
    const data = {
      "latitude": `${latitude}`,
      "longitude": `${longitude}`,
    }
    // GeolocationCoordinates { latitude: 33.7227231111664, longitude: -111.9814122972247, altitude: 536.8526000976562, accuracy: 65, altitudeAccuracy: 10, heading: null, speed: null 
    // };
    axios({
      method: 'post',
      baseURL: 'https://quiet-plateau-57365.herokuapp.com/',
      url: 'locations',
      data,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // The response comes here
      console.log(response);
      return response
    })
    .catch((error) => {
      // Errors are reported there
      console.log(error);
    });
  }

  const [usersLocations, setUsersLocations] = useState([])

  const getUsersLocations = () => {
    return axios({
      method: 'get',
      baseURL: 'https://quiet-plateau-57365.herokuapp.com/',
      url: 'locations',
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => {
      console.log(response)
      setUsersLocations(response.data.locations)
    })
    .catch((error) => {
      console.error(error);
    });
  }
  const [isLoading, setLoading] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  useEffect(() => {
    if (isLoading) {
      getUsersLocations()
      .then(() => {
        setLoading(false);
        setShowLocations(true);
      });
    } 
  }, [isLoading]);

  const handleLoadClick = () => setLoading(true);
  const handleClearClick = () => setShowLocations(false);

  getLocation()
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
      <ul>
      {usersLocations.length > 0 && showLocations &&
  usersLocations.map(loc => <li key={loc._id}>Latitude: {loc.latitude}  Longitude: {loc.longitude}</li>)}
  </ul>
      </main>
    </Container>
    </div>
  );
}

export default App;
