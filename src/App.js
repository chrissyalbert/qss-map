import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Map } from './Components/Map'
import { Home } from './Components/Home'
import { About } from './Components/About'
import './App.css';

function App() {
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
    const [showLocations, setShowLocations] = useState(false)
    useEffect(() => {
      if (isLoading) {
        getUsersLocations().then(() => {
          setLoading(false);
          setShowLocations(true);
        });
      }
    }, [isLoading]);
  
    const handleLoadClick = () => setLoading(true);
    const handleClearClick = () => setShowLocations(false);
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/">
            <Home 
              getLocation={getLocation}
              postToSheet={postToSheet}
              getUsersLocations={getUsersLocations}
              usersLocations={usersLocations}
              handleLoadClick={handleLoadClick}
              handleClearClick={handleClearClick}
              isLoading={isLoading}
              showLocations={showLocations}
            />
          </Route>
        </Switch>
      </div>
    </Router>
    
      
  );
}

export default App;
