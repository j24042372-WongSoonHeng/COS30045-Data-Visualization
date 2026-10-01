# Exercise 4.4: Load Data from CSV

## Aim & Purpose
Learn how to load, parse, and format tabular data from an external CSV file using D3.js so that it is properly typed, analysed, and prepared for chart generation.

---

## Overview & Workflow

1. **Data Preparation**:
   - The television dataset was processed using KNIME (aggregating brand occurrences).
   - Exported as a clean CSV without extra quoting (`Never` option in KNIME).
   - Saved to `assets/Data/Exercise4.4.csv`.

2. **Loading & Row Conversion (`d3.csv`)**:
   - Loaded external data via `d3.csv()`.
   - Used a row accessor function with the unary `+` operator (`+d.count`) to convert string numbers into proper JavaScript numeric types:
     ```javascript
     d3.csv("assets/Data/Exercise4.4.csv", d => {
         return {
             brand: d.brand,
             count: +d.count
         };
     })
     ```

3. **Data Inspection & Metrics**:
   - Checked the resolved array of objects inside `.then(data => { ... })`.
   - Determined key properties of the dataset using D3 utility functions:
     - `data.length`: Total number of records (25 brands).
     - `d3.max(data, d => d.count)`: Highest brand count (`1096` - Samsung).
     - `d3.min(data, d => d.count)`: Lowest brand count (`24` - Skyworth / Walton).
     - `d3.extent(data, d => d.count)`: Extent `[min, max]` (`[24, 1096]`).

4. **Data Sorting**:
   - Sorted the dataset in descending order based on `count`:
     ```javascript
     data.sort((a, b) => b.count - a.count);
     ```

5. **Visualisation Hand-off**:
   - Handed the sorted data off to `drawBarChart(data)`, preparing for full SVG bar chart construction in Exercise 4.5.

---

## File Structure
- `index.html`: Contains the D3 visualization container (`.responsive-svg-container`) and script imports.
- `assets/Data/Exercise4.4.csv`: The exported TV brand counts dataset.
- `assets/js/main.js`: D3 logic for CSV loading, conversion, analysis, and calling `drawBarChart(data)`.
