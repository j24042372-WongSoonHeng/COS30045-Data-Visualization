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
// Configured to bin on energyConsumption accessor
const binGenerator = d3.bin()
    .value(d => d.energyConsumption);
