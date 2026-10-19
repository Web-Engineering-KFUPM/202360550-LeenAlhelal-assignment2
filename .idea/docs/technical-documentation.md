# Technical Documentation

This assignment is a responsive personal portfolio that uses basic HTML, CSS, and JavaScript elements. The website includes an About Me section detailing my field and interests, a project section displaying a sample of some of the projects I have worked on, and a contact section.

## Project Structure

* `index.html` - Contains the foundational structure and content of the website.
* `css/styles.css` - Contains the styling, layout, colors, responsive design, and accessibility-related styles.
* `js/script.js` - Contains the JavaScript functionality, including the dark/light mode toggle, contact form interaction, and automatic copyright year.
* `assets/images/` - Contains the images used for the project cards.
* `docs/` - Contains the project documentation and AI usage report.
* `README.md` - Contains general information about the project and instructions for running it.

## HTML

The `index.html` file contains the main structure of the website. HTML elements such as `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` are used to organize the page.

The website contains the following main sections:

* **Home:** Introduces me and provides buttons to navigate to the projects and contact sections.
* **About Me:** Provides a short introduction and lists my interests.
* **Projects:** Displays two projects, the Accessibility-Aware Route Planner and the Gym Management System.
* **Contact:** Contains a form where users can enter their name, email, and message.
* **Footer:** Displays the copyright information and current year.

The navigation links use section IDs such as `#about`, `#projects`, and `#contact` to allow users to move between sections of the page.

The contact form does not have a backend, so it does not actually send messages. JavaScript instead displays:

> "Thank you! This is a demo form, so your message was not sent anywhere."

## CSS

The `styles.css` file controls the visual appearance and layout of the website.

CSS variables are used to store colors, spacing-related values, font settings, and other reusable styles.

Flexbox and CSS Grid are used to create the page layout. CSS Grid is used for the project cards, allowing the projects to appear side by side on larger screens and stack vertically on smaller screens.

Media queries are used to make the website responsive. The layout changes at smaller screen sizes so that the navigation, buttons, project cards, and other content remain usable on tablets and mobile devices.

A hover effect was also added to the project cards. It uses `transform`, `box-shadow`, and `transition` to make a card slightly move upward and appear more elevated when the user hovers over it.

The stylesheet also includes focus styles and a skip link to improve keyboard accessibility.

## JavaScript

The `js/script.js` file provides the interactive features of the website, such as the dark/light mode toggle.

### Dark/Light Mode

The theme toggle allows users to switch between light and dark mode.

When the button is clicked, JavaScript changes the `data-theme` attribute on the HTML element. The CSS then uses this attribute to apply the appropriate colors for the selected theme.

## Accessibility

I learned that Claude can include accessibility features in the code, such as labels for form fields, alternative text for images, keyboard focus styles, and a skip-to-content link. I found it interesting that these small details can make a website easier for different users to navigate. It also made me more aware of accessibility when developing websites and how it can be considered from the beginning of a project.
