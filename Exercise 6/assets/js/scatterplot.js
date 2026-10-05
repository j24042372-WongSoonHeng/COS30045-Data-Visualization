// scatterplot.js - Exercise 6.3 Scatterplot Implementation

const drawScatterplot = (data) => {
    // 1. Setup SVG container for scatterplot
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // 2. Set innerChartS declared in shared-constants.js
    innerChartS = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // 3. Set up xScaleS and yScaleS domains
    // Star rating on x-axis (0 to max star rating with breathing room)
    const maxStar = d3.max(data, d => d.star) || 10;
    xScaleS
        .domain([0, Math.ceil(maxStar)])
        .range([0, innerWidth])
        .nice();

    // Energy consumption on y-axis (0 to max energy consumption)
    const maxEnergy = d3.max(data, d => d.energyConsumption) || 2800;
    yScaleS
        .domain([0, maxEnergy])
        .range([innerHeight, 0])
        .nice();

    // 4. Draw circles for each data point
    innerChartS
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("class", "scatter-circle")
        .attr("r", 4)
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5);

    // 5. Add Bottom X Axis (Star Rating)
    const bottomAxis = d3.axisBottom(xScaleS)
        .ticks(10);

    innerChartS.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // X Axis Label
    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "end")
        .attr("x", innerWidth)
        .attr("y", innerHeight + 40)
        .text("Star Rating");

    // 6. Add Left Y Axis (Energy Consumption)
    const leftAxis = d3.axisLeft(yScaleS)
        .ticks(8)
        .tickFormat(d3.format(","));

    innerChartS.append("g")
        .attr("class", "axis y-axis")
        .call(leftAxis);

    // Y Axis Label (positioned vertically)
    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "start")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight)
        .attr("y", -50)
        .text("Labeled Energy Consumption (kWh/year)");

    // 7. Add Legend in top-right corner of SVG
    const legendGroup = innerChartS.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${innerWidth - 110}, 10)`);

    const categories = colorScale.domain();

    categories.forEach((category, i) => {
        const itemGroup = legendGroup.append("g")
            .attr("transform", `translate(0, ${i * 22})`);

        // Colour box
        itemGroup.append("rect")
            .attr("width", 14)
            .attr("height", 14)
            .attr("rx", 2)
            .attr("fill", colorScale(category));

        // Label text
        itemGroup.append("text")
            .attr("x", 22)
            .attr("y", 11)
            .style("font-family", "'Hanken Grotesk', sans-serif")
            .style("font-size", "12px")
            .style("fill", "var(--color-text-main, #4a4036)")
            .text(category);
    });
};
