# Exercise 6 – Interactive Visualisations

## Overview
This exercise explores interactive data visualisation on the web using **D3.js (v7)** based on Dufour & Meeks (2024, Chapter 7). The implementation visualises the **January 2026 Australian Television Energy Rating Dataset** (`Ex6_TVdata_withStar.csv`), containing over 4,200 models with details on brand, screen size, screen technology, star rating, and labeled annual energy consumption (kWh/year).

---

## Exercise Summary

### 1. Exercise 6.1: TV Energy Consumption Histogram
- **Aim**: Construct a responsive histogram showing frequency distribution of TV energy consumption.
- **Implementation**:
  - Modular architecture separating chart logic ([assets/js/histogram.js](file:///c:/Users/MyPredator/Desktop/school/INTI/Degree/Aug2026/COS30045%20DATA%20VISUALISATION/COS30045-Data-Visualization/Exercise%206/assets/js/histogram.js)), data loading ([assets/js/load-data.js](file:///c:/Users/MyPredator/Desktop/school/INTI/Degree/Aug2026/COS30045%20DATA%20VISUALISATION/COS30045-Data-Visualization/Exercise%206/assets/js/load-data.js)), and shared chart configurations ([assets/js/shared-constants.js](file:///c:/Users/MyPredator/Desktop/school/INTI/Degree/Aug2026/COS30045%20DATA%20VISUALISATION/COS30045-Data-Visualization/Exercise%206/assets/js/shared-constants.js)).
  - Utilised `d3.bin()` with accessor `.value(d => d.energyConsumption)`.
  - Inner chart margins strategy with responsive SVG `viewBox`.
  - Linear scales for X-axis (energy bounds) and Y-axis (maximum frequency count with `.nice()`).
  - Styled with `#606464` fill and subtle border separation.

### 2. Exercise 6.2: Interactive Filters
- **Aim**: Provide interactive filter controls to dynamically update histogram bins.
- **Implementation**:
  - Implemented `populateFilters(data)` in [assets/js/interactions.js](file:///c:/Users/MyPredator/Desktop/school/INTI/Degree/Aug2026/COS30045%20DATA%20VISUALISATION/COS30045-Data-Visualization/Exercise%206/assets/js/interactions.js).
  - Button state management using D3 `.classed("active", ...)` for screen technologies (`All`, `LED`, `LCD`, `OLED`).
  - Locked `binGenerator` domain `[0, 2800]` and fixed thresholds to maintain consistent bin boundaries and accurate bar positioning during filtering.
  - Implemented smooth D3 transitions (`.transition().duration(500).ease(d3.easeCubicInOut)`) for bar height adjustments.
  - **Extension**: Added interactive screen size filter buttons (`All Sizes`, `24"`, `32"`, `55"`, `65"`, `98"`).

### 3. Exercise 6.3: Scatterplot with Categorical Colour Coding
- **Aim**: Visualise relationship between TV energy consumption and star rating.
- **Implementation**:
  - Implemented `drawScatterplot(data)` in [assets/js/scatterplot.js](file:///c:/Users/MyPredator/Desktop/school/INTI/Degree/Aug2026/COS30045%20DATA%20VISUALISATION/COS30045-Data-Visualization/Exercise%206/assets/js/scatterplot.js).
  - Uses independent scales `xScaleS` (Star Rating) and `yScaleS` (Energy Consumption) inside dedicated `innerChartS`.
  - Added categorical hue color scale (`d3.scaleOrdinal`) differentiating LED (`#2b5c8f`), LCD (`#d95f02`), and OLED (`#7570b3`).
  - Added semi-transparency (`opacity: 0.5`) to handle dense point clustering.
  - Embedded SVG legend placed in the upper-right corner.

### 4. Exercise 6.4: Interactive Tooltips
- **Aim**: Add detailed hover feedback showing screen size for individual TV models on the scatterplot.
- **Implementation**:
  - Implemented `createTooltip()` and `handleMouseEvents()` in [assets/js/interactions.js](file:///c:/Users/MyPredator/Desktop/school/INTI/Degree/Aug2026/COS30045%20DATA%20VISUALISATION/COS30045-Data-Visualization/Exercise%206/assets/js/interactions.js).
  - SVG group tooltip containing a rounded rectangle (`rx=5`) with semi-transparent background and centered white label.
  - D3 `.on("mouseenter")` and `.on("mouseleave")` event listeners:
    - Queries circle coordinates via `getAttribute("cx")` and `getAttribute("cy")`.
    - Animates hovered circle (`r: 7`, `opacity: 1`) and displays `Screen Size: XX"`.
    - Buffered `xScaleS` domain to `[0, Math.ceil(maxStar) + 1]` to prevent right-edge tooltip clipping/overflow.

---

## Project Structure

```
Exercise 6/
├── index.html                   # Main page with dual switcher (Ex 4-5 & Ex 6)
├── televisions.html             # TV guide page
├── data-story.html              # Appliance narrative page
├── about.html                   # About Us page
├── README.md                    # Project documentation
└── assets/
    ├── css/
    │   ├── styles.css           # Global base layout and typography
    │   └── visualisation.css    # Dedicated D3 chart, filter button and tooltip styles
    ├── Data/
    │   └── Ex6_TVdata_withStar.csv # Australian television energy rating dataset (Jan 2026)
    ├── img/                     # Page images and icons
    └── js/
        ├── shared-constants.js  # Global dimensions, scales, and filter definitions
        ├── load-data.js         # D3 CSV loader and initialization sequence
        ├── histogram.js         # Exercise 6.1 histogram drawing function
        ├── scatterplot.js       # Exercise 6.3 scatterplot drawing function
        ├── interactions.js      # Exercise 6.2 filters and Exercise 6.4 tooltips
        └── scripts.js           # Navigation, FAQ accordion, and chart switcher logic
```

---

## How to Run

Because modern browsers enforce Cross-Origin Resource Sharing (CORS) on `file://` URLs when fetching CSV files via `d3.csv()`:

1. Open this project directory in **VS Code**.
2. Start a local server:
   - Click **"Go Live"** using the **Live Server** extension, OR
   - Run in terminal:
     ```bash
     python -m http.server 8000
     ```
3. Open `http://localhost:8000/index.html` (or `http://127.0.0.1:5500/index.html`) in your browser.
