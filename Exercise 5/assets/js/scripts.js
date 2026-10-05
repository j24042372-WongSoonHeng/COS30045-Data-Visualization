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
    const chartEx4 = document.getElementById("horizontal-bar-chart");
    const chartEx5 = document.getElementById("bar-chart");
    const chartTitle = document.getElementById("chart-title");

    if (btnEx4 && btnEx5 && chartEx4 && chartEx5 && chartTitle) {
        btnEx4.addEventListener("click", () => {
            chartEx4.classList.add("active");
            chartEx5.classList.remove("active");
            btnEx4.className = "btn btn-primary";
            btnEx5.className = "btn btn-outline";
            chartTitle.textContent = "TV Models by Brand (Exercise 4)";
        });

        btnEx5.addEventListener("click", () => {
            chartEx4.classList.remove("active");
            chartEx5.classList.add("active");
            btnEx5.className = "btn btn-primary";
            btnEx4.className = "btn btn-outline";
            chartTitle.textContent = "55\" TV Energy Consumption by Screen Tech (Exercise 5.1)";
        });
    }
});
