import { useD3 } from '../hooks/useD3';
import React from 'react';
import * as d3 from 'd3';
import * as geo from 'd3-geo-projection';

const mapData = require('./north-america.json');

function Map({ data }) {
    const ref = useD3(
        (svg) => {
            const height = 500;
            const width = 500;

            var mapFilter = (item) => {
                return item.properties.sovereignt != 'Denmark'
            }

            

            const vanDerGrinten = geo.geoVanDerGrinten2()
                .scale(width / 3.0 / Math.PI)
                .rotate([10, 10])
                .center([0, 0])
                .translate([width / 2, height / 2])

            
            // Draw the map 
            mapData.features = mapData.features.filter(mapFilter)
            svg.append("g")
                .selectAll("path")
                .data(mapData.features)
                .enter().append("path")
                .attr("fill", "Black")
                .attr("d", d3.geoPath().projection(vanDerGrinten)) //projecting the paths to Van der Grinten
                .style("stroke", "Black")


            //draw lat long coordinates
            
            svg.append("g")
                .selectAll("circle")
                .data(data)
                .enter().append("circle")
                .attr("r", 0.01)
                .attr("transform", function (d) { return "translate(" + vanDerGrinten([d.lon, d.lat]) + ")"; }) //map projection
                .style("stroke", "#d3d3d3")
                .style("fill", "#d3d3d3");
        },
        [data.length]
    );

    return (
        <svg
            ref={ref}
            style={{
                height: 500,
                width: "100%",
                marginRight: "0px",
                marginLeft: "0px",
            }}
        >
        </svg>
    );
}

export default Map;