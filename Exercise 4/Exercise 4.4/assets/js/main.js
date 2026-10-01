// Exercise 4.3 & 4.4: D3 setup and CSV data loading

// SVG setup
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");

// Test SVG element from Exercise 4.3
svg
    .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");

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

// Placeholder function for Exercise 4.5
function drawBarChart(data) {
    console.log("drawBarChart called with data:", data);
    // Visualisation will be built in the next exercise
}

