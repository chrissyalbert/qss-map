import React, { useState } from 'react';
import {Map} from './Components/Map'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import image from './Assets/bg7.jpg'
import './App.css';

let usersLocationsArr = [ 
  {id: 0, lat: 42.360081, long: -71.058884},
  {id: 1, lat: 41.878113, long: -87.629799},
  {id: 2, lat: 33.748997, long: -84.387985},
  {id: 3, lat: 39.739235, long: -104.990250},
  {id: 4, lat: 33.448376, long: -112.074036},
  {id: 5, lat: 58.301945, long: -134.419724},
  {id: 6, lat: 47.606209, long: -122.332069},
  {id: 7, lat: 21.306944, long: -157.858337}
 ]

function addLoc(id) {
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      usersLocationsArr.push({id, latitude, longitude});
    });
  }
}

// function deleteLoc(value) {
  // just change lat and long to null, keep id
//   let i = usersLocations.length;
//   while(i--){
//     if(usersLocations[i] && (arguments.length > 2 && usersLocations[i][id] === value)) {
//       usersLocations.splice(i,1);    
//       }
//   }
// }

function getLocation() {
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position) {
      // let latitude = position.coords.latitude;
      // let longitude = position.coords.longitude;
      usersLocationsArr.push(position.coords);
      console.log('usersLocationsArr: ', usersLocationsArr)
    });
  }
}

function App() {
  getLocation();
  const [usersLocations, setUsersLocations] = useState(usersLocationsArr)

// figure setUsersLocations Method
// <Map />
  return (
    <div className="landing" >
      <Container className="App d-flex h-100 mx-auto flex-column">
      <header className="masthead mb-auto">
        <div className="inner">
          <h3 className="masthead-brand text-light">Light the World</h3>
          <Nav className="justify-space-between" activeKey="/home" >
            <Nav.Item>
              <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
              Disabled
            </Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
              Disabled
            </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </header>
      <main role="main" class="inner cover">
        <h1 class="cover-heading">Unleash your Light</h1>
        <p class="lead">Click "Allow Location Access" at the prompt from your browser so that your light can be seen by all our community.</p>
        <p class="lead">
          
        </p>
      </main>
    </Container>
    </div>
      
  );
}

export default App;

/*
var removeByAttr = function(arr, attr, value){
  var i = arr.length;
  while(i--){
     if( arr[i] 
         && arr[i].hasOwnProperty(attr) 
         && (arguments.length > 2 && arr[i][attr] === value ) ){ 

         arr.splice(i,1);

     }
  }
  return arr;
}
*/