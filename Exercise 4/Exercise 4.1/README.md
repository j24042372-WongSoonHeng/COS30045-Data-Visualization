# Exercise 4.1: Draw SVGs & D3 DOM Manipulation

## Overview
This exercise covers two parts:
1. **Draw SVGs**: Understanding the SVG coordinate system and utilizing SVG primitive shapes (`<rect>`, `<circle>`, `<ellipse>`, `<line>`, `<polygon>`, `<polyline>`, `<path>`, `<text>`) and grouping (`<g>` with `transform`).
2. **Manipulate and add elements with D3**: Using D3.js (v7) to select DOM elements, apply styles, append new HTML elements (`<p>`), and dynamically generate and style SVG elements (`<rect>`).

## Files Created
- [`index.html`](file:///c:/Users/MyPredator/Desktop/school/INTI/Degree/Aug2026/COS30045%20DATA%20VISUALISATION/COS30045-Data-Visualization/Exercise%204/Exercise%204.1/index.html): Complete web page with the SVG house drawing, interactive SVG coordinate anatomy diagrams, reference table, and D3 demo containers.
- [`js/main.js`](file:///c:/Users/MyPredator/Desktop/school/INTI/Degree/Aug2026/COS30045%20DATA%20VISUALISATION/COS30045-Data-Visualization/Exercise%204/Exercise%204.1/js/main.js): D3 script performing styling, element appending, and SVG rectangle generation.

## SVG Primitives Demonstrated
- **`<rect>`**: Sky, lawn, house main body, door, chimney, window frames.
- **`<circle>`**: Sun, tree foliage, door handle, round attic window.
- **`<ellipse>`**: Fluffy clouds, pond, garden tree foliage.
- **`<line>`**: Sun rays, window pane dividers, garden fence pickets.
- **`<polygon>`**: Triangular house roof (`points="260,100 140,200 380,200"`).
- **`<polyline>`**: Chimney smoke curls and fence cross-beam.
- **`<path>`**: Curved garden pathway using cubic Bézier curves (`C`).
- **`<text>`**: House title and captions.
- **`<g>`**: Window group with shared stroke/fill and `transform="translate(x, y)"`.

## D3.js DOM Operations Demonstrated
- **`d3.select("...").style(...)`**: Styled the section heading dynamically.
- **`d3.select("...").append("p").text(...)`**: Appended a energy consumption recommendation paragraph into the target `<div>`.
- **`d3.select("svg").append("rect").attr(...)`**: Appended a customized SVG rectangle and explanatory text label.
