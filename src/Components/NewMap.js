import React, {useEffect} from 'react'
import * as d3 from "d3"
import * as d3GeoProjection from 'd3-geo-projection'
import * as d3Geo from 'd3-geo'
import Delaunator from 'delaunator';

export function NewMap(props) {
  useEffect(() => {
    drawMap();
  }, [])

  const drawMap = () => {
    var mapFilter = (item) => {
      return item.properties.sovereignt != 'Denmark'
  }
  
  var airportFilter = (item) => {
      return item.country == 'United States'
  }
  
  var svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");
  
  
  var vanDerGrinten = d3GeoProjection.geoVanDerGrinten2()
      .scale(width / 3.0 / Math.PI)
      .rotate([10, 10])
      .center([0, 0])
      .translate([width / 2, height / 2])
  
  //draw base map
  d3.json(
      'https://raw.githubusercontent.com/koopjs/geodata/master/north-america.geojson'
      , function (data) {
          // Draw the map 
          data.features = data.features.filter(mapFilter)
          svg.append("g")
              .selectAll("path")
              .data(data.features)
              .enter().append("path")
              .attr("fill", "Black")
              .attr("d", d3Geo.geoPath().projection(vanDerGrinten)) //projecting the paths to Van der Grinten
              .style("stroke", "Black")
      }) 
  
  //draw lat long coordinates
  d3.json(
      'https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json'
      , function (data) {
          data = data.filter(airportFilter)
          // Draw the map
          svg.append("g")
              .selectAll("circle")
              .data(data)
              .enter().append("circle")
              .attr("r", 1)
              .attr("transform", function (d) { return "translate(" + vanDerGrinten([d.lon, d.lat]) + ")"; }) //map projection
              .style("stroke", "#d3d3d3")
              .style("fill", "#d3d3d3");
      }) 
  
  d3.json('https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json'
      , function (d) {
          d = d.filter(airportFilter)
          let projectedPoints = d.map(({ lat: latitude, lon: longitude }) => vanDerGrinten([longitude, latitude]))
          const delaunay = Delaunator.from(projectedPoints)
          console.log(delaunay)
          let mesh = [delaunay.triangles, delaunay.halfedges]
  
          //draw delauney diagram
          svg.append("g")
              .selectAll("line")
              .data(delaunay.coords)
              .enter().append("line")
              .style("fill", "White")
              .style("stroke", "White");
      })
  }

  return <div id={"#" + props.id}></div>;
}

