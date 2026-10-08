// Exercise 5.1: Vertical Bar Chart with Axis

(() => {
    const margin = { top: 60, right: 40, bottom: 50, left: 55 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");

    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Step 1: Load in data using d3.csv() and cast energy consumption to number
    d3.csv("assets/Data/Data_exercise 5.1-1.csv", d => {
        return {
            Screen_Tech: d.Screen_Tech,
            Energy_Consumption: +d["Mean(Labelled energy consumption (kWh/year))"]
        };
    }).then(data => {
        console.log("Loaded Exercise 5.1 Data:", data);

        data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);
        console.log("Sorted Data (descending):", data);

        drawBarChart(data);
    }).catch(error => {
        console.error("Error loading CSV file:", error);
    });

    // Step 2: Function to draw the bar chart
    const drawBarChart = data => {
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.Screen_Tech))
            .range([0, innerWidth])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, 400])
            .range([innerHeight, 0]);

        const bottomAxis = d3.axisBottom(xScale)
            .tickFormat(d => d.toUpperCase());

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
            .attr("x", -45)
            .attr("y", -20)
            .attr("text-anchor", "start")
            .style("font-size", "14px")
            .style("font-weight", "600")
            .text("Energy Consumption (kWh)");

        innerChart
            .selectAll("rect.bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.Screen_Tech))
            .attr("y", d => yScale(d.Energy_Consumption))
            .attr("width", xScale.bandwidth())
            .attr("height", d => innerHeight - yScale(d.Energy_Consumption))
            .attr("fill", "green");

        innerChart
            .selectAll("text.bar-label")
            .data(data)
            .join("text")
            .attr("class", "bar-label")
            .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d.Energy_Consumption) - 8)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("font-weight", "500")
            .text(d => `${Math.round(d.Energy_Consumption)} kWh`);
    };
})();
