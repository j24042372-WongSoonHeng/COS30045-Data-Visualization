## Exercise 4.6 - Scaling Charts

### Aim & Purpose
Make the bar chart adaptable to different SVG dimensions and prevent fixed-pixel overflow by utilizing D3 scales:
- **`d3.scaleLinear()`**: Continuous scale mapping numeric count values (x-axis domain `[0, 1200]`) to viewBox coordinates (range `[0, 400]`).
- **`d3.scaleBand()`**: Discrete / categorical scale mapping TV brand categories (y-axis domain) evenly across the chart height (range `[0, 400]`) with inner padding (`.paddingInner(0.2)`) to space the bars.

### Changes Implemented
1. **SVG Dimensions**: Updated `viewBox` in [main.js](file:///c:/Users/MyPredator/Desktop/school/INTI/Degree/Aug2026/COS30045%20DATA%20VISUALISATION/COS30045-Data-Visualization/Exercise%204/Exercise%204.6/assets/js/main.js) to `0 0 500 400` to keep the chart compact and well-proportioned.
2. **Linear Scale (`xScale`)**:
   - `domain([0, 1200])` covers the maximum count (~1096) with a safety margin.
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

---

## Exercise 4.7 - Adding Labels

### Aim & Purpose
Add category and numerical value labels to the D3 bar chart to make the visualization readable and informative:
- Group each bar and its associated text elements together inside an SVG `<g>` element so that they move and transform in sync.
- Reserve horizontal space (offsetting bars by `100px`) so that category names can sit neatly to the left of the bars.
- Place quantitative data counts at the end of each bar for clear data reading.

### Key Steps & Implementation Details
1. **Make Room for Labels**:
   - Bars start at `x = 100` instead of `0`, leaving space on the left for brand labels.
   - `xScale` maps `[0, 1200]` to `[0, 380]` so that `100 + xScale(d.count)` comfortably fits inside the `500px` viewBox.
2. **Create Group Container (`<g>`)**:
   - Instead of binding data directly to `<rect>`, bind data to `<g>` using `.selectAll("g").data(data).join("g")`.
   - Apply vertical positioning via `transform`:
     ```javascript
     .attr("transform", d => `translate(0, ${yScale(d.brand)})`);
     ```
3. **Append Rectangles to the Group**:
   - Rectangles are appended directly inside each `g`.
   - Set `.attr("y", 0)` because the group transform already positions the element along the y-axis.
   - Offset horizontally with `.attr("x", 100)`.
4. **Add Category Brand Text**:
   - Append `<text>` element inside each `g`.
   - Set `.attr("x", 90)` and `.attr("text-anchor", "end")` to achieve clean, right-aligned category names immediately to the left of the bars.
   - Vertically centered using `yScale.bandwidth() / 2 + 4`.
5. **Add Count Value Labels**:
   - Append another `<text>` element displaying `d.count`.
   - Position dynamically at the tip of each bar: `.attr("x", d => 100 + xScale(d.count) + 5)`.
   - Centered vertically to match the category text.

