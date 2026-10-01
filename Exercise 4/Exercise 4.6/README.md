# Exercise 4.6 - Scaling Charts

## Aim & Purpose
Make the bar chart adaptable to different SVG dimensions and prevent fixed-pixel overflow by utilizing D3 scales:
- **`d3.scaleLinear()`**: Continuous scale mapping numeric count values (x-axis domain `[0, 1200]`) to viewBox coordinates (range `[0, 400]`).
- **`d3.scaleBand()`**: Discrete / categorical scale mapping TV brand categories (y-axis domain) evenly across the chart height (range `[0, 400]`) with inner padding (`.paddingInner(0.2)`) to space the bars.

## Changes Implemented
1. **SVG Dimensions**: Updated `viewBox` in [main.js](file:///c:/Users/MyPredator/Desktop/school/INTI/Degree/Aug2026/COS30045%20DATA%20VISUALISATION/COS30045-Data-Visualization/Exercise%204/Exercise%204.6/assets/js/main.js) from `0 0 1200 1600` to `0 0 500 400` to keep the chart compact and well-proportioned.
2. **Linear Scale (`xScale`)**:
   - `domain([0, 1200])` covers the maximum count (~1096) with safety margin.
   - `range([0, 400])` reserves 100px within the 500px width for upcoming labels.
3. **Band Scale (`yScale`)**:
   - `domain(data.map(d => d.brand))` dynamically binds all unique TV brands.
   - `range([0, 400])` fits the vertical extent of the SVG.
   - `paddingInner(0.2)` adds a 20% gap between bars.
4. **Dynamic Attributes**:
   - Class: `bar bar-${d.count}` for general and specific styling.
   - Position `y`: `d => yScale(d.brand)`
   - Width: `d => xScale(d.count)`
   - Height: `yScale.bandwidth()`
5. **Code Cleanup**: Removed legacy manual variables (`barHeight` and index-based spacing offset).
