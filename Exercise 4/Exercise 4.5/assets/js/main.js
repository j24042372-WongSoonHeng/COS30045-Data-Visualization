const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");
d3.csv("assets/Data/Exercise4.4.csv", d => {
    return {
        brand: d.brand,
        count: +d.count
    };
}).then(data => {
    console.log("Loaded TV Brand Data:", data);
    console.log("Number of records (data.length):", data.length);
    console.log("Max count (d3.max):", d3.max(data, d => d.count));
    console.log("Min count (d3.min):", d3.min(data, d => d.count));
    console.log("Count extent [min, max] (d3.extent):", d3.extent(data, d => d.count));
    data.sort((a, b) => b.count - a.count);
    console.log("Sorted Data (descending):", data);
    drawBarChart(data);
}).catch(error => {
    console.error("Error loading CSV file:", error);
});
const drawBarChart = data => {
    const barHeight = 20;

    svg
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => `bar-${d.count}`)
        .attr("x", 0)
        .attr("y", (d, i) => i * (barHeight + 5))
        .attr("width", d => d.count)
        .attr("height", barHeight)
        .attr("fill", "steelblue");
};


