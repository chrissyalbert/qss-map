
var mapFilter = (item) => {
    return item.properties.sovereignt != 'Denmark'
}

var airportFilter = (item) => {
    return item.country == 'United States'
}

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");


var vanDerGrinten = d3.geoVanDerGrinten2()
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
            //med blue
            .attr("fill", "rgb(53,69,105)")
            .attr("d", d3.geoPath().projection(vanDerGrinten)) //projecting the paths to Van der Grinten
            //med blue "rgb(53,69,105)"
            .style("stroke", "rgb(53,69,105)")
            //dark blue "rgb(24,30,42)"
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
            //light gray
            .style("stroke", "rgb(240,225,196)")
            .style("fill", "rgb(240,225,196)");
    }) 

d3.json('https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json'
    , function (d) {
        d = d.filter(airportFilter)
        let projectedPoints = d.map(({ lat: latitude, lon: longitude }) => vanDerGrinten([longitude, latitude]))
        const delaunay = Delaunator.from(pointsprojectedPoints)
        console.log(delaunay)
        let mesh = [delaunay.triangles, delaunay.halfedges]

        //draw delauney diagram
        svg.append("g")
            .selectAll("line")
            .data(delaunay.coords)
            .enter().append("line")
            //dark blue
            .style("fill", "rgb(24,30,42)")
            .style("stroke", "rgb(24,30,42)");
    })



/*let projectedPoints = [];
var i;
for (i = 0; i = 1; i++) {
    x = d[i].lon
    y = d[i].lat
    projectedPoints.push(vanDerGrinten([x, y]));
}
return projectedPoints
*/

/*d3.json(
    'https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json'
    , function (data) {
        var projectedPoints = vanDerGrinten([data.lon, data.lat])
        const delaunay = Delaunator.from(projectedPoints)
        //console.log(projectedPoints)
        console.log(data.lon)
        //console.log(delaunay.triangles.length)
        // Draw the map
        svg.append("g")
            .selectAll("path")
            .data(delaunay)
            .enter().append("path")
            .style("fill", "White")
            .attr('d', delaunay.triangles)
            .style("stroke", "White");
    }) 
    */