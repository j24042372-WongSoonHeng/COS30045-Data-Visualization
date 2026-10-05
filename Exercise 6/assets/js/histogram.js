// histogram.js - D3 Histogram implementation (Exercise 6.1)

const drawHistogram = (data) => {
    // Set the dimensions and margins of the chart area
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`); // Responsive SVG

    // Create an inner chart group with margins
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Generate bins from the dataset using the shared binGenerator
    const bins = binGenerator(data);
    console.log("Generated bins (Exercise 6.1):", bins);

    // Calculate lower and upper bounds of bins for xScale
    const minBins = bins[0].x0;
    const maxBins = bins[bins.length - 1].x1;

    // Calculate upper bound for yScale based on the maximum bin length (frequency)
    const binsMaxLength = d3.max(bins, d => d.length);

    // Update scales domain & range
    xScale
        .domain([minBins, maxBins])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice();

    // Draw the bars of the histogram
    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("class", "histogram-bar")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", 1)
        .append("title")
        .text(d => `Energy Range: ${d.x0} - ${d.x1} kWh/year\nNumber of TVs: ${d.length}`);

    // Add Bottom X Axis
    const xAxis = d3.axisBottom(xScale)
        .ticks(14)
        .tickFormat(d3.format(","));

    innerChart.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis);

    // X Axis Label
    innerChart.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "end")
        .attr("x", innerWidth)
        .attr("y", innerHeight + 40)
        .text("Labeled Energy Consumption (kWh/year)");

    // Add Left Y Axis
    const yAxis = d3.axisLeft(yScale)
        .ticks(8)
        .tickFormat(d3.format(","));

    innerChart.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis);

    // Y Axis Label
    innerChart.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "start")
        .attr("x", -margin.left + 15)
        .attr("y", -15)
        .text("Frequency");
};
