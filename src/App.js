import React, { useState } from 'react';
//import {Map} from './Components/Map'
import Map from './Components/Prototype-Map.js';
import './App.css';

const testLocationData = require('./Components/airports.json');

const filteredTestLocationData = testLocationData.filter(item => item.country == 'United States')

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

    });
  }
}

/*
function App() {
  getLocation();
  const [usersLocations, setUsersLocations] = useState(usersLocationsArr)

// figure setUsersLocations Method

  return (
    <div className="App">
      <Map />

    </div>
  );
}
*/




const data = [
    { year: 1980, efficiency: 24.3, sales: 8949000 },
    { year: 1985, efficiency: 27.6, sales: 10979000 },
    { year: 1990, efficiency: 28, sales: 9303000 },
    { year: 1991, efficiency: 28.4, sales: 8185000 },
    { year: 1992, efficiency: 27.9, sales: 8213000 },
    { year: 1993, efficiency: 28.4, sales: 8518000 },
    { year: 1994, efficiency: 28.3, sales: 8991000 },
    { year: 1995, efficiency: 28.6, sales: 8620000 },
    { year: 1996, efficiency: 28.5, sales: 8479000 },
    { year: 1997, efficiency: 28.7, sales: 8217000 },
    { year: 1998, efficiency: 28.8, sales: 8085000 },
    { year: 1999, efficiency: 28.3, sales: 8638000 },
    { year: 2000, efficiency: 28.5, sales: 8778000 },
    { year: 2001, efficiency: 28.8, sales: 8352000 },
    { year: 2002, efficiency: 29, sales: 8042000 },
    { year: 2003, efficiency: 29.5, sales: 7556000 },
    { year: 2004, efficiency: 29.5, sales: 7483000 },
    { year: 2005, efficiency: 30.3, sales: 7660000 },
    { year: 2006, efficiency: 30.1, sales: 7762000 },
    { year: 2007, efficiency: 31.2, sales: 7562000 },
    { year: 2008, efficiency: 31.5, sales: 6769000 },
    { year: 2009, efficiency: 32.9, sales: 5402000 },
    { year: 2010, efficiency: 33.9, sales: 5636000 },
    { year: 2011, efficiency: 33.1, sales: 6093000 },
    { year: 2012, efficiency: 35.3, sales: 7245000 },
    { year: 2013, efficiency: 36.4, sales: 7586000 },
    { year: 2014, efficiency: 36.5, sales: 7708000 },
    { year: 2015, efficiency: 37.2, sales: 7517000 },
    { year: 2016, efficiency: 37.7, sales: 6873000 },
    { year: 2017, efficiency: 39.4, sales: 6081000 },
]
/*
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Map data={data} />
            </header>
        </div>
    );
}
export default App;
*/

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Map data={filteredTestLocationData} />
            </header>
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