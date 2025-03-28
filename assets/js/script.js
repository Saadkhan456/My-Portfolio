"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

// Helper function to normalize filter values
const getFilterValue = (text) => {
  const value = text.toLowerCase();
  if (value === "mini projects") return "mini-projects";
  return value;
};

// Filter function
const filterFunc = function (selectedValue) {
  // Convert selected value to match data-category format
  selectedValue = getFilterValue(selectedValue);

  filterItems.forEach((item) => {
    const itemCategory = item.dataset.category;

    if (selectedValue === "all") {
      item.classList.add("active");
    } else if (selectedValue === itemCategory) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Add event to all select items
selectItems.forEach((item) => {
  item.addEventListener("click", function () {
    const selectedValue = this.innerText;
    selectValue.innerText = selectedValue;
    elementToggleFunc(select);
    filterFunc(selectedValue);

    // Update active state of filter buttons
    filterBtn.forEach((btn) => {
      btn.classList.remove("active");
      if (
        btn.innerText.toLowerCase() === selectedValue.toLowerCase() ||
        (selectedValue === "All" && btn.innerText === "All")
      ) {
        btn.classList.add("active");
      }
    });
  });
});

// Add event to all filter button items
let lastClickedBtn = filterBtn[0];

filterBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText;
    selectValue.innerText = selectedValue;
    filterFunc(selectedValue);

    // Update active states
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

    // Update select dropdown value
    const selectItem = Array.from(selectItems).find(
      (item) => item.innerText.toLowerCase() === selectedValue.toLowerCase()
    );
    if (selectItem) {
      selectValue.innerText = selectItem.innerText;
    }
  });
});

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
formInputs.forEach((input) => {
  input.addEventListener("input", function () {
    form.checkValidity()
      ? formBtn.removeAttribute("disabled")
      : formBtn.setAttribute("disabled", "");
  });
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav links
navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const pageName = link.textContent.trim().toLowerCase();

    // Hide all pages and remove active class from links
    pages.forEach((page) => page.classList.remove("active"));
    navigationLinks.forEach((nav) => nav.classList.remove("active"));

    // Show target page
    const targetPage = document.querySelector(`[data-page="${pageName}"]`);
    if (targetPage) {
      targetPage.classList.add("active");
      link.classList.add("active");
      window.scrollTo(0, 0);
    } else {
      console.error(`No section found for ${pageName}`);
    }
  });
});

// Initialize page
document.querySelector("[data-page='about']").classList.add("active");
document.querySelector("[data-nav-link].active")?.classList.add("active");
