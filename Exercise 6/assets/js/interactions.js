// interactions.js - Interactive filter functionality (Exercise 6.2)

const populateFilters = (data) => {
    // Current filter states
    let currentScreenFilter = "all";
    let currentSizeFilter = "all";

    // Function to apply filters and transition the histogram bars
    const updateHistogram = () => {
        // Filter dataset based on active screen technology & screen size
        let updatedData = data;

        if (currentScreenFilter !== "all") {
            updatedData = updatedData.filter(tv => tv.screenTech === currentScreenFilter);
        }

        if (currentSizeFilter !== "all") {
            const targetSize = +currentSizeFilter;
            updatedData = updatedData.filter(tv => tv.screenSize === targetSize);
        }

        // Use filtered data to calculate updated bins
        const updatedBins = binGenerator(updatedData);

        // Update the histogram rectangles and apply transitions
        const bars = d3.selectAll("#histogram .histogram-bar")
            .data(updatedBins, d => d.x0);

        bars.transition()
            .duration(500)
            .ease(d3.easeCubicInOut)
            .attr("x", d => xScale(d.x0))
            .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
            .attr("y", d => yScale(d.length))
            .attr("height", d => innerHeight - yScale(d.length));

        // Update the tooltip titles to reflect current bin range and count
        d3.selectAll("#histogram .histogram-bar")
            .select("title")
            .text(d => `Energy Range: ${d.x0} - ${d.x1} kWh/year\nNumber of TVs: ${d.length}`);
    };

    // 1. Render Screen Tech filter buttons
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (e, d) => {
            console.log("Clicked filter:", e);
            console.log("Clicked filter data:", d);

            // If the clicked filter is not already active, update the active state of the filters
            if (!d.isActive) {
                filters_screen.forEach(filter => {
                    filter.isActive = d.id === filter.id ? true : false;
                });

                // Update the filter buttons based on which one was clicked
                d3.selectAll("#filters_screen .filter")
                    .classed("active", filter => filter.id === d.id ? true : false);

                currentScreenFilter = d.id;
                updateHistogram();
            }
        });

    // 2. Render Extension Screen Size filter buttons (if #filters_size exists)
    if (d3.select("#filters_size").node() && typeof filters_size !== "undefined") {
        d3.select("#filters_size")
            .selectAll(".filter")
            .data(filters_size)
            .join("button")
            .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
            .text(d => d.label)
            .on("click", (e, d) => {
                if (!d.isActive) {
                    filters_size.forEach(filter => {
                        filter.isActive = d.id === filter.id ? true : false;
                    });

                    d3.selectAll("#filters_size .filter")
                        .classed("active", filter => filter.id === d.id ? true : false);

                    currentSizeFilter = d.id;
                    updateHistogram();
                }
            });
    }
};

// Exercise 6.4: Tooltips for Scatterplot
const createTooltip = () => {
    // 1. Append tooltip group to innerChartS, with initial opacity 0
    const tooltip = innerChartS.append("g")
        .attr("id", "tooltip")
        .style("opacity", 0)
        .style("pointer-events", "none"); // Avoid tooltip interfering with mouse events

    // 2. Append tooltip background rectangle
    tooltip.append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", barColor)
        .attr("fill-opacity", 0.85);

    // 3. Append tooltip text
    tooltip.append("text")
        .attr("class", "tooltip-text")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2 + 5)
        .attr("text-anchor", "middle")
        .style("font-family", "'Hanken Grotesk', sans-serif")
        .style("font-size", "12px")
        .style("font-weight", "600")
        .style("fill", "#ffffff");
};

const handleMouseEvents = () => {
    // Select all circle elements in scatterplot
    innerChartS.selectAll("circle")
        .on("mouseenter", (e, d) => {
            console.log("Mouse enter circle event:", e);
            console.log("Circle data:", d);

            // Get circle coordinates using getAttribute
            const cx = +e.target.getAttribute("cx");
            const cy = +e.target.getAttribute("cy");

            // Update tooltip text with screen size information
            d3.select("#tooltip .tooltip-text")
                .text(`Screen Size: ${d.screenSize}"`);

            // Position tooltip relative to circle centre and transition to opacity 1
            d3.select("#tooltip")
                .attr("transform", `translate(${cx - tooltipWidth / 2}, ${cy - tooltipHeight - 8})`)
                .transition()
                .duration(200)
                .style("opacity", 1);

            // Optional visual highlight for hovered circle
            d3.select(e.target)
                .transition()
                .duration(150)
                .attr("r", 7)
                .attr("opacity", 1);
        })
        .on("mouseleave", (e, d) => {
            // Make tooltip transparent and reset position
            d3.select("#tooltip")
                .transition()
                .duration(200)
                .style("opacity", 0);

            // Reset circle size and opacity
            d3.select(e.target)
                .transition()
                .duration(150)
                .attr("r", 4)
                .attr("opacity", 0.5);
        });
};


