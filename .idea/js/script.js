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


/* ==========================================================================
   ASSIGNMENT 2: PROJECT FILTER
   ========================================================================== */

const projectFilter = document.getElementById("project-filter");
const projectCards = document.querySelectorAll(".project-card");
const projectCount = document.getElementById("project-count");
const projectEmpty = document.getElementById("project-empty");

function filterProjects() {
    const selectedStatus = projectFilter.value;
    let visibleCount = 0;

    projectCards.forEach((card) => {
        const cardStatus = card.dataset.status;

        const shouldShow =
            selectedStatus === "all" ||
            cardStatus === selectedStatus;

        card.hidden = !shouldShow;

        if (shouldShow) {
            visibleCount++;
        }
    });

    if (projectCount) {
        projectCount.textContent =
            `${visibleCount} project${visibleCount === 1 ? "" : "s"} shown`;
    }

    if (projectEmpty) {
        projectEmpty.hidden = visibleCount !== 0;
    }
}

if (projectFilter) {
    projectFilter.addEventListener("change", filterProjects);
    filterProjects();
}

/* ==========================================================================
   ASSIGNMENT 2: ACCESSIBILITY CUSTOMIZATION
   ========================================================================== */

// Find the controls in the accessibility settings panel.
const textScale = document.getElementById("text-scale");
const textScaleValue = document.getElementById("text-scale-value");

const lineSpacing = document.getElementById("line-spacing");
const lineSpacingValue = document.getElementById("line-spacing-value");

const contrastSetting = document.getElementById("contrast-setting");
const widthSetting = document.getElementById("width-setting");

const resetAccessibility =
    document.getElementById("reset-accessibility");

const accessibilityStatus =
    document.getElementById("accessibility-status");

// The default preferences used when the page first loads.
const defaultAccessibilitySettings = {
    textScale: 100,
    lineSpacing: 1.6,
    contrast: "standard",
    width: "comfortable"
};

// A key used to save and retrieve preferences in this browser.
const accessibilityStorageKey = "leen-portfolio-accessibility";

function loadAccessibilitySettings() {
    try {
        const savedSettings =
            localStorage.getItem(accessibilityStorageKey);

        if (savedSettings) {
            return {
                ...defaultAccessibilitySettings,
                ...JSON.parse(savedSettings)
            };
        }
    } catch (error) {
        // Storage may be unavailable or the saved data may be invalid.
        console.warn("Could not load accessibility preferences.");
    }

    return { ...defaultAccessibilitySettings };
}

function saveAccessibilitySettings(settings) {
    try {
        localStorage.setItem(
            accessibilityStorageKey,
            JSON.stringify(settings)
        );

        return true;
    } catch (error) {
        // The page still works even if preferences cannot be saved.
        console.warn("Could not save accessibility preferences.");

        return false;
    }
}

function applyAccessibilitySettings(settings, announce = false) {
    // Keep values within the ranges offered by the controls.
    const scale = Math.min(150, Math.max(100,
        Number(settings.textScale) || 100));

    const spacing = Math.min(2.2, Math.max(1.4,
        Number(settings.lineSpacing) || 1.6));

    const contrast =
        settings.contrast === "high" ? "high" : "standard";

    const width =
        settings.width === "narrow" ? "narrow" : "comfortable";

    // Apply the settings through CSS custom properties and attributes.
    document.documentElement.style.setProperty(
        "--text-scale",
        scale / 100
    );

    document.documentElement.style.setProperty(
        "--reading-line-height",
        spacing
    );

    document.documentElement.dataset.contrast = contrast;

    document.documentElement.style.setProperty(
        "--max-width",
        width === "narrow" ? "850px" : "1100px"
    );

    // Update the controls so they reflect the current settings.
    textScale.value = scale;
    textScaleValue.textContent = `${scale}%`;

    lineSpacing.value = spacing;
    lineSpacingValue.textContent = spacing.toFixed(1);

    contrastSetting.value = contrast;
    widthSetting.value = width;

    // Save the preferences for the visitor's next visit.
    const saved = saveAccessibilitySettings({
        textScale: scale,
        lineSpacing: spacing,
        contrast: contrast,
        width: width
    });

    // Announce feedback when the visitor finishes changing a setting.
    if (announce) {
        accessibilityStatus.textContent = saved
            ? "Your preferences have been applied and saved on this device."
            : "Your preferences have been applied, but could not be saved.";
    }
}

// Load saved settings when the page opens.
if (
    textScale &&
    lineSpacing &&
    contrastSetting &&
    widthSetting &&
    resetAccessibility &&
    accessibilityStatus
) {
    const initialSettings = loadAccessibilitySettings();

    applyAccessibilitySettings(initialSettings);

    // Apply changes immediately as the visitor moves a slider.
    textScale.addEventListener("input", function () {
        const settings = loadAccessibilitySettings();

        settings.textScale = Number(textScale.value);

        applyAccessibilitySettings(settings);
    });

    lineSpacing.addEventListener("input", function () {
        const settings = loadAccessibilitySettings();

        settings.lineSpacing = Number(lineSpacing.value);

        applyAccessibilitySettings(settings);
    });

    // Apply and announce changes when a selection is made.
    contrastSetting.addEventListener("change", function () {
        const settings = loadAccessibilitySettings();

        settings.contrast = contrastSetting.value;

        applyAccessibilitySettings(settings, true);
    });

    widthSetting.addEventListener("change", function () {
        const settings = loadAccessibilitySettings();

        settings.width = widthSetting.value;

        applyAccessibilitySettings(settings, true);
    });

    // Announce the final slider value when the visitor finishes adjusting it.
    textScale.addEventListener("change", function () {
        accessibilityStatus.textContent =
            "Text size updated. Your preferences are saved on this device.";
    });

    lineSpacing.addEventListener("change", function () {
        accessibilityStatus.textContent =
            "Line spacing updated. Your preferences are saved on this device.";
    });

    // Restore all default settings.
    resetAccessibility.addEventListener("click", function () {
        applyAccessibilitySettings(
            defaultAccessibilitySettings,
            true
        );
    });
}
