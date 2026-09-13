# COS30045 – Data Visualisation
## Exercise 3 – Television Energy Consumption & Data Story

Welcome to **Exercise 3** for COS30045 Data Visualisation.

This project investigates television energy efficiency in Australia through an interactive multi-page website and data story. By examining official energy rating data, the website helps Australian consumers understand the trade-offs between screen size, display technology, and running costs.

---

## About the Data

## 1. Data Source
**Primary Source**: The dataset was provided by the course instructor as part of the COS30045 Data Visualisation unit materials, containing information on TV models registered for sale in Australia.
**Scope**: The dataset covers TV specifications including brand, model number, screen size (cm), screen technology (LCD / LCD(LED) / OLED), star rating, and labelled energy consumption (kWh/year).

## 2. Data Processing
**Workflow Tool**: Data extraction, transformation, and statistical calculations were executed using the KNIME Analytics Platform.
**Cleaning & Filtering**:
    -   **Removed unnecessary** columns using Column Filter.
    -   **Standardised inconsistent** brand names (e.g. "Samsung" vs "samsung electronics") using String Cleaner and String Replacer.
    -   **Filtered rows** to only include TVs currently marked as Available and sold in Australia, using Nominal Value Row Filter.
    -   **Created a derived screensize_inch** column (screensize in cm ÷ 2.54), used purely as a cross-check against the Model_No field to verify the accuracy of the original screen size data.
    -   **Categorised television sizes** into three tiers using an Expression node:
        **if($["screensize_inch"] < 43, "Small", $["screensize_inch"] <= 65, "Medium", "Large")**
**Aggregation & Metrics:**
    -   **Used GroupBy** and Pivot nodes to compute average annual energy consumption (kWh/year) by screen size category (Small/Medium/Large) and by screen technology (LCD/LCD(LED)/OLED).
    -   **Generated brand market share** counts and screen size distribution histograms.
    -   **Exported visual assets** (scatter plots, bar charts, pie charts, histograms) as static images to support the Data Story page.
    
## 3. Privacy
**No Personal Identifiable Information (PII):** The dataset consists solely of product-level specifications and energy test figures for commercial TV models. It does not contain any information relating to individual consumers or households.
**Consumer Privacy:** No user tracking, private household telemetry, or personal consumer data were collected, stored, or processed during the preparation or deployment of this project.

## 4. Accuracy and Limitations
**Verification of unusual values:** Some screen sizes (e.g. 146cm, 152.6cm, 176.5cm) initially appeared unusual compared to best-selling sizes. These were cross-checked against the Model_No field and confirmed to be genuine, standard sizes (58", 60", 70") that are simply less common than popular sizes (55", 65", 75") — not data errors.
**Testing Standard Consistency:** Labelled energy consumption (kWh/year) reflects standardised test conditions and may not exactly match real-world usage, which varies with picture mode settings, brightness, daily viewing hours, and standby power habits.
**Market Scope Limitations:** The dataset only reflects models registered for sale at the time it was compiled; discontinued models or newer releases may not be captured.

## 5. Ethics    
**Transparency & Integrity:** Chart scales and groupings were kept proportional and fair, avoiding misleading or exaggerated visual claims.
**Consumer Empowerment vs. Commercial Bias:** Comparisons across brands and panel types are presented objectively, without promotional bias toward any specific manufacturer.
**Responsible Communication:** Findings are framed to help consumers make more energy-conscious purchasing decisions, without exaggerating claims beyond what the data supports.

## 6. AI Declaration
Generative AI tools (Claude and Gemini Antigravity IDE) were used to support the development of this project. Specific uses included:

**KNIME troubleshooting:** Getting help understanding error messages, syntax issues in Expression nodes (e.g. converting cm to inches, building the Small/Medium/Large categorisation logic), and diagnosing why chart outputs did not match expected results.
**Data Story planning:** Discussing how to structure the Data Story page for a general consumer audience, including identifying the target audience, drafting the storyboard sequence (Issue → Demonstrate Issue → Ideas for Overcoming Issue → Describe the Approach → Show the Evidence → Technology Matters Too → Recommendation), and refining page copy for clarity and tone.
**Chart annotation guidance:** Advice on simplifying KNIME chart exports for a non-technical audience (e.g. renaming axis labels, removing raw KNIME interface elements, adding descriptive titles).
**Website content and styling:** Assistance with HTML/CSS structure, wording for headings and body text, and minor code troubleshooting (e.g. Git commit/push issues).

---

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
