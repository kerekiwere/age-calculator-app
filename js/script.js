// Get form and input elements from DOM
const form = document.getElementById("form");
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const outputDays = document.getElementById("output-days");
const outputMonths = document.getElementById("output-months");
const outputYears = document.getElementById("output-years");
let validForm = false;

// Listen for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm();
});

// Function to set error message and styling
function setError(element, message) {
  const inputDiv = element.parentElement;
  const errorText = inputDiv.querySelector(".error-text");

  errorText.innerText = message;
  inputDiv.classList.add("error");
  validForm = false;
}

// Function to clear all error messages and styles
function clearError() {
  document
    .querySelectorAll(".error")
    .forEach((el) => el.classList.remove("error"));

  document.querySelectorAll(".error-text").forEach((el) => (el.innerText = ""));

  validForm = true;
}

// Function to get the last day of the month for the selected year and month
function getLastDay() {
  const lastDay = new Date(year.value, month.value, 0).getDate();
  return lastDay;
}

// Function to validate form inputs
function validateForm() {
  clearError();

  // Validate day input
  if (day.value === "") {
    setError(day, "This field is required");
  } else if (day.value < 1 || day.value > getLastDay()) {
    setError(day, "Must be a valid day");
  }

  // Validate month input
  if (month.value === "") {
    setError(month, "This field is required");
  } else if (month.value < 1 || month.value > 12) {
    setError(month, "Must be a valid month");
  }

  // Validate year input
  if (year.value === "") {
    setError(year, "This field is required");
  } else if (year.value > new Date().getFullYear()) {
    setError(year, "Must be in the past");
  } else if (new Date(year.value, month.value - 1, day.value) > new Date()) {
    setError(day, "Date must be in the past");
    setError(month, "");
    setError(year, "");
  }

  // If form is valid, calculate age
  if (validForm) {
    calculateAge();
  }
}

// Function to calculate age based on input date
function calculateAge() {
  const birth = new Date(year.value, month.value - 1, day.value);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    // Calculate the number of days in the previous month
    let previousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    days += previousMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Animate counters for years, months, and days
  animateCounter(outputYears, years);
  animateCounter(outputMonths, months);
  animateCounter(outputDays, days);
}

// Function to animate counting up to a value
function animateCounter(output, value) {
  let current = 0;
  const interval = setInterval(() => {
    current++;
    if (current <= value) {
      output.innerText = current;
    } else {
      output.innerText = value;
      clearInterval(interval);
    }
  }, 10);
}
