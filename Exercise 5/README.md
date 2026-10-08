# Exercise 5 – Multi-Chart Webpage

## Overview
In Exercise 5, we extend our D3.js skills from simple horizontal bar charts to building multiple common chart types integrated into a single responsive webpage:
1. **Horizontal Bar Chart** (Exercise 4 legacy) – TV model counts by brand.
2. **Vertical Bar Chart with Axes** (Exercise 5.1) – Mean energy consumption for 55" TVs by screen technology.
3. **Scatter Plot & Line Chart** (Exercise 5.2) – Electricity spot prices in Australia (1998–2024).
4. **Donut Chart** (Exercise 5.3) – Proportion of small, medium, and large TV screen sizes.

All charts are cleanly integrated into [index.html](file:///c:/Users/MyPredator/Desktop/school/INTI/Degree/Aug2026/COS30045%20DATA%20VISUALISATION/COS30045-Data-Visualization/Exercise%205/index.html) using an interactive **Chart Switcher** that allows switching between charts without page reloads or layout shift.

---

## Exercise 5.1 – Vertical Bar Chart with Axes

### Aim & Purpose
- Learn how to add scaled X and Y axes with proper labels using D3.js.
- Plot quantitative values (Energy Consumption in kWh/year) on the Y-axis and categorical data (Screen Technology) on the X-axis for 55-inch TVs.

### Implementation Details ([bar-chart.js](file:///c:/Users/MyPredator/Desktop/school/INTI/Degree/Aug2026/COS30045%20DATA%20VISUALISATION/COS30045-Data-Visualization/Exercise%205/assets/js/bar-chart.js))
- **Dataset**: `Data_exercise 5.1-1.csv` containing columns `Screen_Tech` and `Mean(Labelled energy consumption (kWh/year))`.
- **D3 Margin Convention**:
  - `margin = { top: 60, right: 40, bottom: 50, left: 55 }`
  - Dimensions: `width = 1000`, `height = 500`.
  - Inner chart group translated using `.attr("transform", translate(${margin.left}, ${margin.top}))`.
- **Scales**:
  - `xScale`: `d3.scaleBand()` mapping screen technology categories (`LED`, `OLED`, `LCD`) with `padding(0.1)`.
  - `yScale`: `d3.scaleLinear()` with domain `[0, 400]` and inverted range `[innerHeight, 0]`. Expanding the domain to 400 ensures comfortable breathing room above the tallest bar (369 kWh) so tick values and titles do not overlap.
- **Axes & Labels**:
  - Bottom axis: `d3.axisBottom(xScale).tickFormat(d => d.toUpperCase())`.
  - Left axis: `d3.axisLeft(yScale)`.
  - Y-axis title: Added text reading `Energy Consumption (kWh)` at `(x: -45, y: -20)`.
  - Value labels: Positioned on top of each bar displaying rounded consumption values (`369 kWh`, `362 kWh`, `335 kWh`).

---

## Exercise 5.2 – Scatter Plot and Line Chart

### Aim & Purpose
- Visualise continuous time-series data using scales (`d3.scaleLinear()` with `d3.extent()`).
- Combine a line generator (`d3.line()`) with a scatter plot overlay (`circle` elements) to highlight data points over a 27-year span.

### Implementation Details ([line-chart.js](file:///c:/Users/MyPredator/Desktop/school/INTI/Degree/Aug2026/COS30045%20DATA%20VISUALISATION/COS30045-Data-Visualization/Exercise%205/assets/js/line-chart.js))
- **Dataset**: `ARE_Spot_Prices.csv` investigating average electricity spot prices in Australia from 1998 to 2024.
- **Scales**:
  - `xScale`: `d3.scaleLinear().domain(d3.extent(data, d => d.year)).range([0, innerWidth])`.
  - `yScale`: `d3.scaleLinear().domain([0, d3.max(data, d => d.averagePrice)]).range([innerHeight, 0])`.
- **Axes**:
  - Bottom axis: Formatted using `d3.format("d")` so years are displayed as clean integers without decimal places.
  - Left axis: Scaled linear axis labeled `Average Price ($ per mWh)`.
- **Line & Scatter Marks**:
  - `d3.line()` generator mapping `d.year` to X and `d.averagePrice` to Y.
  - Appended SVG `<path>` with `stroke: "green"`, `stroke-width: 2`, and `fill: "none"`.
  - Appended `<circle>` elements with radius `r: 4` and `fill: "green"` for each data point.

---

## Exercise 5.3 – Donut Chart

### Aim & Purpose
- Learn how to compute angles and draw circular arcs using `d3.pie()` and `d3.arc()`.
- Display category proportions (`small`, `medium`, `large` TV screen sizes) as a donut chart with inner and outer radii.

### Implementation Details ([donut-chart.js](file:///c:/Users/MyPredator/Desktop/school/INTI/Degree/Aug2026/COS30045%20DATA%20VISUALISATION/COS30045-Data-Visualization/Exercise%205/assets/js/donut-chart.js))
- **Dataset**: `Data_exercise 5.3.csv` containing TV model counts grouped into `small`, `medium`, and `large`.
- **Dimensions & Placement**:
  - SVG center positioned via `transform: translate(width / 2, height / 2)`.
  - `radius = Math.min(width, height) / 2 - 20`.
- **Color Scale & Pie Generator**:
  - `color`: `d3.scaleOrdinal().domain(...).range(d3.schemeSet2)`.
  - `pie`: `d3.pie().value(d => d.Count).sort(null)` to preserve original table category sequence.
- **Arc Generator**:
  - `innerRadius(radius * 0.6)` and `outerRadius(radius * 1)` to carve out the donut center.
  - Slice borders highlighted with 2px white strokes.
- **Centroid Labels**:
  - Used `arcGenerator.centroid(d)` to accurately place labels at the center of each slice.
  - Multi-line `<tspan>` labels display the category name alongside formatted model counts (e.g. `large` / `1,352 models`, `medium` / `2,386 models`, `small` / `770 models`).

---

## Architecture & Interactive Chart Switcher

- **Modular Code**: Each chart resides in its own isolated script file (`main.js`, `bar-chart.js`, `line-chart.js`, `donut-chart.js`) wrapped in an Immediately Invoked Function Expression (IIFE) to avoid global scope pollution.
- **CSS Architecture ([styles.css](file:///c:/Users/MyPredator/Desktop/school/INTI/Degree/Aug2026/COS30045%20DATA%20VISUALISATION/COS30045-Data-Visualization/Exercise%205/assets/css/styles.css))**:
  - `.chart-switcher`: Flex container placing switcher buttons consistently beneath the chart title.
  - `.chart-panel` & `.chart-panel.active`: Controls visibility (`display: none` / `display: block`) with zero layout flickering.
  - Reuses project design tokens (`.btn`, `.btn-primary`, `.btn-outline`).
- **Interactive Script ([scripts.js](file:///c:/Users/MyPredator/Desktop/school/INTI/Degree/Aug2026/COS30045%20DATA%20VISUALISATION/COS30045-Data-Visualization/Exercise%205/assets/js/scripts.js))**:
  - Handles click events to toggle button active states, update the dynamic chart heading, and reveal the selected chart panel cleanly.