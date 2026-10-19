/* ==========================================================================
   script.js - Leen Alhelal's portfolio

   1. Dark / light mode toggle (the main interactive feature)
   2. Contact form confirmation message (no backend yet)
   3. Current year in the footer
   ========================================================================== */


/* --------------------------------------------------------------------------
   1. DARK / LIGHT MODE TOGGLE

   How it works:
   - The <html> element gets a data-theme attribute: "light" or "dark".
   - styles.css has different colour variables for each value.
   - Clicking the button flips the attribute, and the colours change.
   - The choice is saved in localStorage so it is remembered on the next visit.
   -------------------------------------------------------------------------- */

// Grab the elements we need from the page
const themeToggleButton = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;   // the <html> element

// The name we use to save the choice in the browser
const THEME_STORAGE_KEY = "portfolio-theme";

// Apply a theme ("light" or "dark") to the page
function applyTheme(theme) {
  htmlElement.setAttribute("data-theme", theme);

  // The button text describes what will happen when it is clicked
  if (theme === "dark") {
    themeToggleButton.textContent = "Switch to light mode";
  } else {
    themeToggleButton.textContent = "Switch to dark mode";
  }
}

// Work out which theme to start with
function getInitialTheme() {
  let savedTheme = null;

  // try/catch: some browsers block localStorage, and we don't want the page to break
  try {
    savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    savedTheme = null;
  }

  // 1st choice: the theme the visitor picked last time
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  // 2nd choice: the theme their device prefers (e.g. dark mode turned on in their system)
  const devicePrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return devicePrefersDark ? "dark" : "light";
}

// When the button is clicked: switch theme and remember the choice
themeToggleButton.addEventListener("click", function () {
  const currentTheme = htmlElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(newTheme);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  } catch (error) {
    // If saving fails, the theme still changes for this visit. Nothing else to do.
  }
});

// Set the starting theme as soon as the page loads
applyTheme(getInitialTheme());


/* --------------------------------------------------------------------------
   2. CONTACT FORM

   There is no backend, so nothing is really sent. When the form is submitted
   we stop the page from reloading and show a message instead.
   The browser has already checked the required fields (and the email format)
   before this code runs.

   Later, you could replace this with code that sends the data to a service.
   -------------------------------------------------------------------------- */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();   // stops the normal form behaviour (page reload)

  formStatus.textContent = "Thank you! This is a demo form, so your message was not sent anywhere.";
  contactForm.reset();      // clears the fields
});


/* --------------------------------------------------------------------------
   3. FOOTER YEAR
   Fills in the current year so you never have to update it by hand.
   -------------------------------------------------------------------------- */

document.getElementById("current-year").textContent = new Date().getFullYear();