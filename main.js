// Create the dropdown menu
var datasets = ["KSEA.csv", "KNYC.csv", "IND.csv"];
let selectedFile = "KSEA.csv";

var tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

  var tooltipBox = d3.select("body").append("div")
  .attr("class", "tooltip-box")
  .style("opacity", 0);

var dropdown = d3.select("#dropdown_container")
  .append("select")
  .on("change", function() {
    d3.selectAll("svg").selectAll("path").remove();
    d3.selectAll("svg").selectAll("g").remove();
    selectedFile = d3.event.target.value;
    d3.csv(selectedFile).then(function(data) {
        // Format the data
        data.forEach(function(d) {
          d.date = new Date(d.date);
          d.actual_precipitation = +d.actual_precipitation;
          d.average_precipitation = +d.average_precipitation;
          d.record_precipitation = +d.record_precipitation;
        });
      
        // Set the domain of the x and y scales
        xScale.domain(d3.extent(data, function(d) { return d.date; }));
        yScale.domain([0, d3.max(data, function(d) { return Math.max(d.actual_precipitation, d.average_precipitation, d.record_precipitation); })]);
      
    
        // Add the actual precipitation line
      var actualPrecipitationLine = d3.line()
      .x(function(d) { return xScale(d.date); })
      .y(function(d) { return yScale(d.actual_precipitation); })
      .defined(function(d) { return d.actual_precipitation != null; }); // added to remove undefined values
      
      svg.append("path")
        .data([data])
        .attr("class", "line actual")
        .attr("d", actualPrecipitationLine)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("stroke", "steelblue")
        .on("mouseover", function() {
            tooltip.transition()
            .duration(200)
            .style("opacity", .9);
            tooltipBox.transition()
            .duration(200)
            .style("opacity", .9);
        })
        .on("mousemove", function(d) {
            var bisectDate = d3.bisector(function(d) { return d.date; }).left;
            var mouseX = d3.mouse(this)[0];
            var x0 = xScale.invert(mouseX);
            var i = bisectDate(data, x0, 1);
            var d0 = data[i - 1];
            var d1 = data[i];
            var d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            tooltip.html("Date: " + d.date + "<br/>Actual Precipitation: " + d.actual_precipitation)
              .style("left", (d3.event.pageX + 5) + "px")
              .style("top", (window.innerHeight - 60) + "px");
            tooltipBox.html("Date: " + d.date + "<br/>Actual Precipitation: " + d.actual_precipitation);
            tooltipBox.style("left", (d3.event.pageX + 5) + "px")
                .style("top", (yScale(Math.max(d.actual_precipitation, yMin)) + margin.top + 100) + "px");
           
          })
        .on("mouseout", function(d) {
            tooltip.transition()
            .duration(500)
            .style("opacity", 0);
  });

      
      
      // Add the average precipitation line
      var averagePrecipitationLine = d3.line()
      .x(function(d) { return xScale(d.date); })
      .y(function(d) { return yScale(d.average_precipitation); })
      .defined(function(d) { return d.average_precipitation != null; }); // added to remove undefined values
      
      svg.append("path")
        .data([data])
        .attr("class", "line average")
        .attr("d", averagePrecipitationLine)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("stroke", "green")
        .on("mouseover", function() {
            tooltip.transition()
            .duration(200)
            .style("opacity", .9);
            tooltipBox.transition()
            .duration(200)
            .style("opacity", .9);
        })
        .on("mousemove", function(d) {
            var bisectDate = d3.bisector(function(d) { return d.date; }).left;
            var mouseX = d3.mouse(this)[0];
            var x0 = xScale.invert(mouseX);
            var i = bisectDate(data, x0, 1);
            var d0 = data[i - 1];
            var d1 = data[i];
            var d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            tooltip.html("Date: " + d.date + "<br/>Average Precipitation: " + d.average_precipitation)
              .style("left", (d3.event.pageX + 5) + "px")
              .style("top", (window.innerHeight - 60) + "px");
            tooltipBox.html("Date: " + d.date + "<br/>Average Precipitation: " + d.average_precipitation);
            tooltipBox.style("left", (d3.event.pageX + 5) + "px")
                .style("top", (yScale(Math.max(d.average_precipitation, yMin)) + margin.top + 100) + "px");
           
          })
        .on("mouseout", function(d) {
            tooltip.transition()
            .duration(500)
            .style("opacity", 0);
  });

      
      // Add the record precipitation line
      var recordPrecipitationLine = d3.line()
      .x(function(d) { return xScale(d.date); })
      .y(function(d) { return yScale(d.record_precipitation); })
      .defined(function(d) { return d.record_precipitation != null; }); // added to remove undefined values
      
      svg.append("path")
        .data([data])
        .attr("class", "line record")
        .attr("d", recordPrecipitationLine)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("stroke", "red")
        .on("mouseover", function() {
            tooltip.transition()
            .duration(200)
            .style("opacity", .9);
            tooltipBox.transition()
            .duration(200)
            .style("opacity", .9);
        })
        .on("mousemove", function(d) {
            var bisectDate = d3.bisector(function(d) { return d.date; }).left;
            var mouseX = d3.mouse(this)[0];
            var x0 = xScale.invert(mouseX);
            var i = bisectDate(data, x0, 1);
            var d0 = data[i - 1];
            var d1 = data[i];
            var d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            tooltip.html("Date: " + d.date + "<br/>Record Precipitation: " + d.record_precipitation)
              .style("left", (d3.event.pageX + 5) + "px")
              .style("top", (window.innerHeight - 60) + "px");
            tooltipBox.html("Date: " + d.date + "<br/>Record Precipitation: " + d.record_precipitation);
            tooltipBox.style("left", (d3.event.pageX + 5) + "px");
                
           
          })
        .on("mouseout", function(d) {
            tooltip.transition()
            .duration(500)
            .style("opacity", 0);
  });

      
        // Add the x axis
        svg.append("g")
          .attr("class", "axis x")
          .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
          .call(xAxis);
      
          // Add the y axis
        svg.append("g")
        .attr("class", "axis y")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yAxis);
      
          // Add the y axis label
          svg.append("text")
          .attr("class", "axis-label")
          .attr("transform", "rotate(-90)")
          .attr("x", -height/2)
          .attr("y", margin.left/2)
          .style("text-anchor", "middle")
          .text("Precipitation (mm)");
      
      }
      )
      
    });
  dropdown.selectAll("option")
  .data(datasets)
  .enter().append("option")
  .attr("value", function(d) { return d; })
  .text(function(d) { return d; });
      

// Define the dimensions of the SVG canvas
var width = 600;
var height = 400;

// Create the SVG canvas
var svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Set the margins for the plot area
var margin = { top: 20, right: 20, bottom: 30, left: 50 };
var plotWidth = width - margin.left - margin.right;
var plotHeight = height - margin.top - margin.bottom;

// Define the x and y scales
var xScale = d3.scaleTime().range([0, plotWidth]);
var yScale = d3.scaleLinear().range([plotHeight, 0]);

// Define the x and y axes
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);