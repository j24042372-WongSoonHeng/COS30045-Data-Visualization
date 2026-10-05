document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open FAQ items for a pure accordion feel
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Chart Switcher (Exercise 5)
    const btnEx4 = document.getElementById("btn-chart-ex4");
    const btnEx5 = document.getElementById("btn-chart-ex5");
    const btnEx52 = document.getElementById("btn-chart-ex52");
    const chartEx4 = document.getElementById("horizontal-bar-chart");
    const chartEx5 = document.getElementById("bar-chart");
    const chartEx52 = document.getElementById("line-chart");
    const chartTitle = document.getElementById("chart-title");

    const allButtons = [btnEx4, btnEx5, btnEx52];
    const allCharts = [chartEx4, chartEx5, chartEx52];

    const switchChart = (activeBtn, activeChart, titleText) => {
        allButtons.forEach(btn => {
            if (btn) btn.className = (btn === activeBtn) ? "btn btn-primary" : "btn btn-outline";
        });
        allCharts.forEach(chart => {
            if (chart) chart.classList.toggle("active", chart === activeChart);
        });
        if (chartTitle) chartTitle.textContent = titleText;
    };

    if (btnEx4) {
        btnEx4.addEventListener("click", () => {
            switchChart(btnEx4, chartEx4, "TV Models by Brand (Exercise 4)");
        });
    }

    if (btnEx5) {
        btnEx5.addEventListener("click", () => {
            switchChart(btnEx5, chartEx5, "55\" TV Energy Consumption by Screen Tech (Exercise 5.1)");
        });
    }

    if (btnEx52) {
        btnEx52.addEventListener("click", () => {
            switchChart(btnEx52, chartEx52, "Electricity Spot Prices in Australia (1998-2024) (Exercise 5.2)");
        });
    }
});
