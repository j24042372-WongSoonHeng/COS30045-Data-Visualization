# Exercise 6 – Interactive Visualisations

## Overview
This exercise explores interactive data visualisation on the web using **D3.js (v7)** based on Dufour & Meeks (2024, Chapter 7). The project visualises the **Australian Television Energy Rating Dataset** (`Ex6_TVdata_withStar.csv`), containing television models with details on brand, screen size, screen technology, star rating, and labeled annual energy consumption (kWh/year).

---

## Exercise Summary

### 1. Exercise 6.1: TV Energy Consumption Histogram
- **Aim**: Construct a responsive histogram showing the frequency distribution of TV energy consumption.
- **Implementation**:
  - Modular architecture separating chart logic ([assets/js/histogram.js](assets/js/histogram.js)), data loading ([assets/js/load-data.js](assets/js/load-data.js)), and shared chart configurations ([assets/js/shared-constants.js](assets/js/shared-constants.js)).
  - Configured `d3.bin()` with accessor `.value(d => d.energyConsumption)` and customized bin count via `.thresholds(20)`.
  - Inner chart margins strategy with responsive SVG `viewBox`.
  - Linear scales for X-axis (energy bounds) and Y-axis (maximum frequency count with `.nice()`).
  - Styled with `#606464` fill and border separation using `#fffaf0`.

### 2. Exercise 6.2: Interactive Filters
- **Aim**: Provide independent interactive filter controls to dynamically update charts based on screen technology (`All`, `LED`, `LCD`, `OLED`).
- **Implementation**:
  - Implemented `populateFilters(data)` in [assets/js/interactions.js](assets/js/interactions.js).
  - Provided separate button containers (`#filters_histogram` and `#filters_scatterplot`) with independent state arrays (`filters_histogram` and `filters_scatterplot`).
  - Dynamic button state management via D3 `.classed("active", ...)`.
  - **Histogram Filter**: Smooth D3 transitions (`.transition().duration(500).ease(d3.easeCubicInOut)`) for bar height adjustments based on filtered bins.
  - **Scatterplot Filter**: Linked data filtering that updates circle positions and color transitions according to selected screen tech.

### 3. Exercise 6.3: Scatterplot with Categorical Colour Coding
- **Aim**: Visualise the relationship between TV energy consumption and star rating.
- **Implementation**:
  - Implemented `drawScatterplot(data)` in [assets/js/scatterplot.js](assets/js/scatterplot.js).
  - Independent scales `xScaleS` (Star Rating) and `yScaleS` (Energy Consumption) inside dedicated `innerChartS`.
  - Categorical color scale (`d3.scaleOrdinal`) with `d3.schemeCategory10` mapping screen technologies.
  - Semi-transparency (`opacity: 0.5`) for managing dense point overlaps.
  - Dynamic categorical legend generated in the upper-right corner.

### 4. Exercise 6.4: Interactive Tooltips
- **Aim**: Provide hover feedback on individual scatterplot data points.
- **Implementation**:
  - Implemented `createTooltip()` and `handleMouseEvents()` in [assets/js/interactions.js](assets/js/interactions.js).
  - SVG group tooltip containing a rounded rectangle (`rx=5`, `ry=5`, width: 70px) and centered label text.
  - Interactive mouse events (`mouseenter` / `mouseleave`):
    - Dynamically updates text to show energy consumption (`d.energyConsumption`).
    - Translates tooltip position relative to data point (`cx`, `cy`).
    - Enlarges hovered point radius (`r: 7`, `opacity: 1`) and resets on mouse leave (`r: 4`, `opacity: 0.5`).

---

## Project Structure

```
Exercise 6/
├── index.html                  # Main page with dual switcher (Ex 4-5 & Ex 6)
├── README.md                   # Project documentation
└── assets/
    ├── css/
    │   ├── styles.css          # Global base layout and typography
    │   └── visualisation.css   # Dedicated D3 chart, filter button and tooltip styles
    ├── Data/
    │   └── Ex6_TVdata_withStar.csv # Australian television energy rating dataset (Jan 2026)
    ├── img/                    # Page images and icons
    └── js/
        ├── shared-constants.js # Global dimensions, scales, bin settings, and filter arrays
        ├── load-data.js        # D3 CSV loader and initialization sequence
        ├── histogram.js        # Exercise 6.1 histogram drawing function
        ├── scatterplot.js      # Exercise 6.3 scatterplot drawing function
        ├── interactions.js     # Exercise 6.2 filters and Exercise 6.4 tooltips
        └── scripts.js          # Navigation, FAQ accordion, and chart switcher logic
```