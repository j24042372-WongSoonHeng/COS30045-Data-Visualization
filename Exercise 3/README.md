# COS30045 – Data Visualisation
## Exercise 3 – Television Energy Consumption & Data Story

## Overview

In this exercise, a data story was developed based on the TV Energy Consumption dataset. Building on the website created in Exercise 0.2, the site was extended to present a clear narrative supported by data visualisations, helping everyday consumers understand how TV size and technology affect energy use.

---

## Data Story

### Audience

The target audience for this visualisation is everyday consumers — people who are shopping for a new TV, or who are simply curious about what might be driving up their power bill. This audience typically has no technical background in energy ratings or data analysis; they just want a straightforward answer to a practical question: "What size and type of TV should I get if I care about running costs?"

This audience is interested in:

Whether a bigger screen really uses that much more power
Which brands and sizes are most common on the market
Whether panel technology (LCD, LCD(LED), OLED) makes a noticeable difference
A simple, practical takeaway they can use before their next TV purchase

### Story Overview

This visualisation explores how TV energy consumption varies with screen size and panel technology. The goal is to help everyday readers understand:

That most buyers pick a TV based on size and budget alone, without considering energy use
How screen size relates to yearly energy consumption
That panel technology (LCD / LCD(LED) / OLED) also affects energy use, independent of size
A practical recommendation for choosing a more energy-conscious TV

The website presents these insights through a step-by-step narrative — moving from the problem, to the supporting data, to a clear recommendation — using visualisations and plain-language explanatory text.

## About the Data
### Data Source

The dataset was provided as part of the COS30045 course materials, containing information on TV models registered for sale in Australia, including brand, model number, screen size (cm), screen technology (LCD / LCD(LED) / OLED), star rating, and labelled energy consumption (kWh/year).

### Data Processing

The dataset was cleaned and processed using the KNIME Analytics Platform. Key steps included:

* Removing unnecessary columns using Column Filter
* Standardising inconsistent brand names (e.g. "Samsung" vs "samsung electronics") using String Cleaner and String Replacer
* Filtering rows to only include TVs marked as Available and sold in Australia, using Nominal Value Row Filter
* Creating a derived screensize_inch column (screensize in cm ÷ 2.54), used as a cross-check against the Model_No field to verify the accuracy of the original screen size data
* Categorising TVs into three size tiers using an Expression node:
  if($["screensize_inch"] < 43, "Small", $["screensize_inch"] <= 65, "Medium", "Large")
* Using GroupBy and Pivot nodes to calculate average energy consumption by size category and by screen technology
* Exporting visual assets (scatter plots, bar charts, pie charts, histograms) as static images for the Data Story page

### Privacy

The dataset consists solely of product-level specifications and energy test figures for commercial TV models. It does not contain any personally identifiable information (PII) or data relating to individual consumers or households.

### Accuracy and Limitations
* Some screen sizes (e.g. 146cm, 152.6cm, 176.5cm) initially appeared unusual compared to best-selling sizes. These were cross-checked against the Model_No field and confirmed to be genuine, standard sizes (58", 60", 70") — not data errors.
* Labelled energy consumption (kWh/year) reflects standardised test conditions and may not exactly match real-world usage, which varies with picture mode settings, brightness, daily viewing hours, and standby power habits.
* The dataset only reflects models registered for sale at the time it was compiled; discontinued models or newer releases may not be captured.

### Ethics
* Chart scales and groupings were kept proportional and fair, avoiding misleading or exaggerated visual claims.
* Comparisons across brands and panel types are presented objectively, without promotional bias toward any specific manufacturer.
Findings are framed to help consumers make more energy-conscious purchasing decisions, without exaggerating claims beyond what the data supports.

## AI Declaration
Generative AI tools (Claude and Gemini Antigravity IDE) were used to support the development of this project. Specific uses included:

**KNIME troubleshooting:** Getting help understanding error messages, syntax issues in Expression nodes (e.g. converting cm to inches, building the Small/Medium/Large categorisation logic), and diagnosing why chart outputs did not match expected results.
**Data Story planning:** Discussing how to structure the Data Story page for a general consumer audience, including identifying the target audience, drafting the storyboard sequence (Issue → Demonstrate Issue → Ideas for Overcoming Issue → Describe the Approach → Show the Evidence → Technology Matters Too → Recommendation), and refining page copy for clarity and tone.
**Chart annotation guidance:** Advice on simplifying KNIME chart exports for a non-technical audience (e.g. renaming axis labels, removing raw KNIME interface elements, adding descriptive titles).
**Website content and styling:** Assistance with HTML/CSS structure, wording for headings and body text, and minor code troubleshooting (e.g. Git commit/push issues).
**README documentation:** Help drafting and organising the sections of this README.

---

## Website Storytelling

The website has been updated to communicate a data-driven story about TV energy consumption, written for an everyday consumer audience. The Data Story page includes:

* Visualisations (pie chart, histogram, scatter plot, and bar charts) presenting key insights from the dataset
* Plain-language text explanations that connect each chart to the overall narrative, avoiding technical jargon
* A clear step-by-step structure — Issue → Demonstrate Issue → Ideas for Overcoming Issue → Describe the Approach → Show the Evidence → Technology Matters Too → Recommendation — that guides the viewer from problem to practical takeaway
* A link back to the existing Televisions page, connecting the data story to more detailed technology and size information

The aim is to help a non-technical reader understand, in a few minutes, how TV size and panel technology affect energy use — and walk away with a clear, practical takeaway for their next TV purchase.

## Project Structure

```bash
Exercise 3
│
├── assets
│   ├── css
│   │   └── styles.css
│   ├── img
│   │   ├── about_hero.png
│   │   ├── data_story_hero.jpg
│   │   ├── home_hero.png
│   │   ├── LED vs OLED.png
│   │   ├── Market Share.png
│   │   ├── PowerIcon.png
│   │   ├── Size vs Energy.png
│   │   ├── size_distribution.png
│   │   ├── Small vs Medium vs Large.png
│   │   └── tv_hero.png
│   └── js
│       └── scripts.js
│
├── index.html
├── televisions.html
├── data-story.html
├── about.html
└── README.md
```

---

## Website Pages

1. **Home (`index.html`)**: Overview of household appliance energy consumption, top power consumers, and FAQs.
2. **Televisions (`televisions.html`)**: Breakdown of TV technologies (LED, LCD, OLED), size considerations, and practical energy-saving tips.
3. **Data Story (`data-story.html`)**: Narrative-driven exploration demonstrating how TV screen size and panel technology directly impact energy bills, backed by visualised charts and recommendations.
4. **About Us (`about.html`)**: Mission statement, scope of coverage, and background on data benchmarks.
