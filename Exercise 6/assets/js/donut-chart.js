// Exercise 5.3: Donut Chart

(() => {
    // Set up chart dimensions
    const width = 1000;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 20; // Leave some padding

    // Add svg container inside #donut-chart
    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");

    // Create innerChart group centered at (width / 2, height / 2)
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Load CSV data
    d3.csv("assets/Data/Data_exercise 5.3.csv", d => {
        return {
            Screensize_Category: d.Screensize_Category,
            Count: +d.Count
        };
    }).then(data => {
        console.log("Loaded Exercise 5.3 Donut Data:", data);
        drawDonutChart(data);
    }).catch(error => {
        console.error("Error loading CSV file:", error);
    });

    const drawDonutChart = data => {
        // Create color scale using d3.scaleOrdinal and d3.schemeSet2
        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.Screensize_Category))
            .range(d3.schemeSet2);

        // Calculate angle for each slice using d3.pie()
        // sort(null) disables sorting to maintain original data order
        const pie = d3.pie()
            .value(d => d.Count)
            .sort(null);

        // Arc generator with innerRadius = 60% and outerRadius = 100% of radius
        const arcGenerator = d3.arc()
            .innerRadius(radius * 0.6)
            .outerRadius(radius * 1);

        // Bind data and create donut chart slices
        innerChart
            .selectAll("path")
            .data(pie(data))
            .join("path")
            .attr("d", arcGenerator)
            .attr("fill", d => color(d.data.Screensize_Category))
            .attr("stroke", "white")
            .attr("stroke-width", 2);

        // Add labels positioned at the centroid of each arc (Category + Count)
        const labels = innerChart
            .selectAll("text")
            .data(pie(data))
            .join("text")
            .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
            .attr("text-anchor", "middle")
            .style("fill", "#222");

        // Category name (e.g. small, medium, large)
        labels
            .append("tspan")
            .attr("x", 0)
            .attr("dy", "-0.2em")
            .style("font-size", "20px")
            .style("font-weight", "600")
            .text(d => d.data.Screensize_Category);

        // Count number (e.g. 770, 2,386, 1,352 models)
        labels
            .append("tspan")
            .attr("x", 0)
            .attr("dy", "1.3em")
            .style("font-size", "12px")
            .style("font-weight", "400")
            .style("fill", "#444")
            .text(d => `${d.data.Count.toLocaleString()} models`);
    };
})();
