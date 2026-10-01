// Exercise 4.3 & 4.4: D3 setup and CSV data loading

// SVG setup
// viewBox width set to 500 (height adjusted to 400 to prevent unreasonable length)
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 500 400")
    .style("border", "1px solid black");

// Step 1 & 2: Row conversion function with d3.csv() to load and type-cast data
d3.csv("assets/Data/Exercise4.4.csv", d => {
    return {
        brand: d.brand,
        count: +d.count //=> converts count to number
    };
}).then(data => {
    // Step 2 & 3: Log dataset and key metrics
    console.log("Loaded TV Brand Data:", data);
    console.log("Number of records (data.length):", data.length);
    console.log("Max count (d3.max):", d3.max(data, d => d.count));
    console.log("Min count (d3.min):", d3.min(data, d => d.count));
    console.log("Count extent [min, max] (d3.extent):", d3.extent(data, d => d.count));

    // Sort data in descending order by count
    data.sort((a, b) => b.count - a.count);
    console.log("Sorted Data (descending):", data);

    // Call drawBarChart to pass data for building visualisation
    drawBarChart(data);
}).catch(error => {
    console.error("Error loading CSV file:", error);
});

// Exercise 4.6: Scaling charts with d3.scaleLinear and d3.scaleBand
const drawBarChart = data => {
    // Step 1: Add Linear scale for count data (x-axis)
    const xScale = d3.scaleLinear()
        .domain([0, 1200])
        .range([0, 400]);

    // Step 3: Add Band scale for discrete brand categories (y-axis) with padding
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 400])
        .paddingInner(0.2);

    // Step 2: Use Linear and Band scales to calculate bar widths, heights, and positions
    svg
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => `bar bar-${d.count}`).attr("x", 0)
        .attr("y", d => yScale(d.brand))
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");
};


