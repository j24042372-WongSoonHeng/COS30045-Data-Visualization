# Exercise 4.5: D3 Binding and Drawing with Data

## Aim & Purpose
The aim of this exercise is to bind loaded dataset records to SVG DOM elements using D3.js and draw horizontal rectangles representing the bars of a bar chart.

## Steps Implemented

### 1. Bind Data to DOM Elements
- Implemented the `drawBarChart` function in [main.js](file:///assets/js/main.js).
- Used D3's `.selectAll("rect").data(data).join("rect")` pattern to create and bind `<rect>` elements to the TV brand data.
- Dynamically assigned a class attribute based on the count value (`bar-${d.count}`) to facilitate identification and styling.

### 2. Configure Attributes (Width, Height, Fill)
- Defined a fixed `barHeight` constant (20px).
- Bound the horizontal length (width) of each bar proportionally to the TV count (`d.count`).
- Applied a fill color (`steelblue`) to make the bars visible.

### 3. Space Out the Bars Along the Y-Axis
- Set the `x` attribute to `0` to align all bars along the left edge.
- Positioned each bar vertically on the y-axis using the datum index `i * (barHeight + 5)`, giving a 5px gap between bars and preventing them from overlapping.

## Current Limitations & Next Steps
- **Scaling**: The bar width is directly tied to raw pixel values of `count` rather than using a D3 linear scale (`d3.scaleLinear()`). If values exceed the SVG viewport width, they will extend beyond the canvas.
- **Labels & Axes**: Axes and text labels (brand names, counts) are not yet attached, which will be implemented in subsequent exercises using D3 scales and axis generators.
