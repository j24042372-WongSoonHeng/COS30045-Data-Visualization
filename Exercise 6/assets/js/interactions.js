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
