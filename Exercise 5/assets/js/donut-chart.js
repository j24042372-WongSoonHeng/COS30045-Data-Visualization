// Exercise 5.3: Donut Chart

(() => {
    // Set up chart dimensions
    const width = 1000;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 20; // Leave some padding

    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");

    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

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
        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.Screensize_Category))
            .range(d3.schemeSet2);

        const pie = d3.pie()
            .value(d => d.Count)
            .sort(null);

        const arcGenerator = d3.arc()
            .innerRadius(radius * 0.6)
            .outerRadius(radius * 1);

        innerChart
            .selectAll("path")
            .data(pie(data))
            .join("path")
            .attr("d", arcGenerator)
            .attr("fill", d => color(d.data.Screensize_Category))
            .attr("stroke", "white")
            .attr("stroke-width", 2);

        const labels = innerChart
            .selectAll("text")
            .data(pie(data))
            .join("text")
            .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
            .attr("text-anchor", "middle")
            .style("fill", "#222");

        labels
            .append("tspan")
            .attr("x", 0)
            .attr("dy", "-0.2em")
            .style("font-size", "20px")
            .style("font-weight", "600")
            .text(d => d.data.Screensize_Category);

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
