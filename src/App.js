import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import { io } from "socket.io-client";

import { Map } from './Components/Map'
import { Home } from './Components/Home'
import { About } from './Components/About'
import './App.css';

// same domain, port 3000
// const socket = io();
// From a different domain
// In case your front is not served from the same domain as your 
// server, you have to pass the URL of your server.
// const socket = io("https://server-domain.com");
// function connect () {
//   socket.on("connect", () => {
//     console.log(socket.id); // x8WIv7-mJelg7on_ALbx
//     console.log(socket.connected);
//     socket.send("Hello!");
//   });
// }

// socket.on("connect_error", () => {
//   setTimeout(() => {
//     socket.connect();
//   }, 1000);
// });
// socket.on("disconnect", () => {
//   console.log(socket.connected); // false
// });
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
      latitude,
      longitude,
    }
    // GeolocationCoordinates { latitude: 33.7227231111664, longitude: -111.9814122972247, altitude: 536.8526000976562, accuracy: 65, altitudeAccuracy: 10, heading: null, speed: null 
    // };
    fetch("http://localhost:3001/locations", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
  function getUsersLocations() {
    return fetch("http://localhost:3001/locations", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      }
    })
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
              postToSheet={postToMongoDBAtlas}
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
