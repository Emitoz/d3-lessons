async function draw() {
    // Dataset
    const dataset = await d3.json("data.json");

    const xAccessor = (d) => d.currently.humidity;
    const yAccessor = (d) => d.currently.apparentTemperature;
     
    //  Dimensions
    let dimensions = {
        width: 800,
        height: 800,
        margin: {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50
        },
    }
    dimensions.ctnrWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
    dimensions.ctnrHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

    // Draw chart 
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
    
    const ctnr = svg.append("g")
        .attr(
            "transform", 
             `translate(${dimensions.margin.top}, ${dimensions.margin.left})`
        )

    const xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, xAccessor))
        .rangeRound([0, dimensions.ctnrWidth])
        .clamp(true )

    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, yAccessor))
        .rangeRound([dimensions.ctnrHeight, 0])
        .nice()
        .clamp(true )

    // Draw circles
    ctnr.selectAll("circle")
        .data(dataset)
        .join("circle")
        .attr("cx", (d) => xScale(xAccessor(d)))
        .attr("cy", (d) => yScale(yAccessor(d)))
        .attr("r", 3)
        .attr("fill", "red") 
    
    // Axes
    const xAxis = d3.axisBottom(xScale)
        .ticks(5)
        .tickFormat((d) => d * 100 + "%");
    const xAxisGroup = ctnr.append("g")
        .call(xAxis)
        .style("transform", `translateY(${dimensions.ctnrHeight}px)`)
        .classed("axis", true)

    xAxisGroup.append("text")
        .attr("x", dimensions.width / 2)
        .attr("y", dimensions.margin.bottom - 10)
        .attr("fill", "black")
        .text("Humidity")

    const yAxis = d3.axisLeft(yScale);
    const yAxisGroup = ctnr.append("g")
        .call(yAxis)
        .classed( "axis", true)
        
    yAxisGroup.append("text")
        .attr("x", -dimensions.ctnrHeight / 2)
        .attr("y", -dimensions.margin.left + 15)
        .attr("fill", "black")
        .html("Temperature &deg;  F")
        .style("transform", `rotate(270deg)`)
        .style("text-anchor", "middle")
}

draw();