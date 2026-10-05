// load-data.js - Load TV dataset and initialize Exercise 6 charts

// Load the CSV file with a row conversion function
d3.csv("assets/Data/Ex6_TVdata_withStar.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize, // Convert screenSize to a number
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption, // Convert energyConsumption to a number
    star: +d.star // Convert to number
})).then(data => {
    // Log the processed data to the console
    console.log("Loaded TV Data (Exercise 6):", data);

    // Call functions after data is loaded
    drawHistogram(data);
    populateFilters(data);

    // Exercise 6.3 & 6.4: Scatterplot and tooltip activation
    drawScatterplot(data);
    createTooltip();
    handleMouseEvents();
}).catch(error => {
    console.error("Error loading the CSV file:", error);
});
