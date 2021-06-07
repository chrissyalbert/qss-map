import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import  io  from "socket.io-client";

import { Map } from './Components/Map'
import { Home } from './Components/Home'
import { About } from './Components/About'
import { Locations } from './Components/Locations'
import './App.css';
import axios from 'axios'

const ioClient = io("http://localhost:3001");
// const ioClient = io();
ioClient.on("connect", () => {
      console.log(ioClient.id); // x8WIv7-mJelg7on_ALbx
      ioClient.send("Hello!");
    });

function App() {
  function getLocation() {
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position) {
        ioClient.on("location", setSocketLocations(position.coords))
        console.log('socketLocations', socketLocations)
        postToMongoDBAtlas(position.coords)
      });
    }
  }
  
  function postToMongoDBAtlas(coordinates) {
    const { latitude, longitude} = coordinates
    console.log('latitude', latitude, 'longitude', longitude)
    const data = {
      "latitude": `${latitude}`,
      "longitude": `${longitude}`,
    }
    console.log('data:', data)
    // GeolocationCoordinates { latitude: 33.7227231111664, longitude: -111.9814122972247, altitude: 536.8526000976562, accuracy: 65, altitudeAccuracy: 10, heading: null, speed: null 
    // };
    axios({
      method: 'post',
      // https://desolate-oasis-74850.herokuapp.com/
      baseURL: 'http://localhost:3001',
      url: '/locations',
      data,
      headers: {
        // "Access-Control-Allow-Origin": "*",
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
  const [socketLocations, setSocketLocations] = useState([])
  function getUsersLocations() {
    axios({
      method: 'get',
      // https://desolate-oasis-74850.herokuapp.com/
      baseURL: 'http://localhost:3001',
      url: '/locations',
      headers: {
        // "Access-Control-Allow-Origin": "*",
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
            <li>
              <Link to="/location">See your friends' locations</Link>
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
              socketLocations={socketLocations}
            />
          </Route>
          <Route path="/locationMap">
            <Locations 
              socketLocations={socketLocations}
            />
          </Route>
        </Switch>
      </div>
    </Router>
    
      
  );
}

export default App;
