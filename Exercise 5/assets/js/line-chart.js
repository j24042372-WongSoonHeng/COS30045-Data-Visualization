// Exercise 5.2: Scatter Plot and Line Chart

(() => {
    // Set up inner chart margins and dimensions (same as Exercise 5.1)
    const margin = { top: 40, right: 40, bottom: 50, left: 50 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");

    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.csv("assets/Data/ARE_Spot_Prices.csv", d => {
        return {
            year: +d.Year,
            averagePrice: +d["Average Price (notTas-Snowy)"]
        };
    }).then(data => {
        console.log("Loaded ARE Spot Prices Data:", data);
        drawLineChart(data);
    }).catch(error => {
        console.error("Error loading CSV file:", error);
    });

    const drawLineChart = data => {
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.year))
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.averagePrice)])
            .range([innerHeight, 0]);

        const bottomAxis = d3.axisBottom(xScale)
            .tickFormat(d3.format("d"));

        const leftAxis = d3.axisLeft(yScale);

        innerChart
            .append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(bottomAxis);

        innerChart
            .append("g")
            .attr("class", "y-axis")
            .call(leftAxis);

        innerChart
            .append("text")
            .attr("class", "axis-label")
            .attr("x", -40)
            .attr("y", -15)
            .attr("text-anchor", "start")
            .style("font-size", "14px")
            .style("font-weight", "600")
            .text("Average Price ($ per mWh)");

        const lineGenerator = d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.averagePrice));

        // Draw Line (path)
        innerChart
            .append("path")
            .attr("d", lineGenerator(data))
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-width", 2);

        // Draw Scatter Plot (circles for data points)
        innerChart
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("r", 4)
            .attr("cx", d => xScale(d.year))
            .attr("cy", d => yScale(d.averagePrice))
            .attr("fill", "green");
    };
})();
