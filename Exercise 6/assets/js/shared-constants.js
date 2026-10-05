// shared-constants.js - Shared constants for Exercise 6 Visualisations

// Set up dimensions and margins
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800; // Total width of the chart
const height = 400; // Total height of the chart
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Set up colors accessible globally
const barColor = "#606464";
const bodyBackgroundColor = "#fbfaf8"; // matches page background for bar gap styling

// Set up the scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Set up bin generator using d3.bin()
// Lock value accessor, domain [0, 2800], and 14 bins (step of 200: 0-200, 200-400...)
// so filtered subsets produce identical bins matching the X-axis
const binGenerator = d3.bin()
    .value(d => d.energyConsumption)
    .domain([0, 2800])
    .thresholds(20);


// Array of filter options for screen types (Exercise 6.2)
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];

// Exercise 6.3 Scatterplot Shared Constants
let innerChartS; // To be attached to scatterplot svg in scatterplot.js
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();

// Colour scale for screen types (Hue based: LED, LCD, OLED)
const colorScale = d3.scaleOrdinal()
    .domain(["LED", "LCD", "OLED"])
    .range(["#2b5c8f", "#d95f02", "#7570b3"]);

// Tooltip dimensions and constants for Exercise 6.4
const tooltipWidth = 130;
const tooltipHeight = 45;


