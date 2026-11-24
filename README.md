# Aryaveer Shahi - Premium Developer Portfolio Website

<div align="center">

[![Live Portfolio Website](https://img.shields.io/badge/🌐_LIVE_PORTFOLIO-CLICK_HERE_TO_OPEN-8B5CF6?style=for-the-badge&logoColor=white)](https://aryaveer-ops.github.io/PERSONAL-PORTFOLIO-/)
[![GitHub Profile](https://img.shields.io/badge/GitHub-Aryaveer--ops-06B6D4?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Aryaveer-ops)

### 🚀 **[👉 CLICK HERE TO OPEN ARYAVEER'S LIVE PORTFOLIO WEBSITE 👈](https://aryaveer-ops.github.io/PERSONAL-PORTFOLIO-/)**

*B.Tech in Computer Science and Engineering (Data Science & AI) &bull; Shri Ramswaroop Memorial University (SRMU), Lucknow*

</div>

---

## 🌟 Visual & Design Highlights

- **Aesthetic**: Premium Dark UI with futuristic purple (`#8B5CF6`) and cyan (`#06B6D4`) gradient accents.
- **Glassmorphism**: Translucent cards with subtle border gradients and backdrop blur.
- **Micro-Animations**:
  - Live interactive particle canvas with dynamic node connections.
  - Smooth cycling typewriter in the hero section.
  - Scroll-triggered reveal animations via `IntersectionObserver`.
  - Dynamic scroll progress bar at the top of the viewport.
  - Interactive skill competency indicators (HTML5, CSS3, JavaScript).
  - One-click email copy with instant toast notifications.

---

## 📁 File Structure

```text
PORTFOLIO/
├── index.html                 # Complete semantic HTML5 structure with SEO & OpenGraph tags
├── style.css                  # Pure CSS3 styles, CSS variables, glassmorphism & responsive layouts
├── script.js                  # Vanilla JavaScript for animations, navigation, validation
├── README.md                  # Project documentation & live links
└── assets/
    ├── profile.jpg            # Aryaveer Shahi's portrait photo
    ├── resume.pdf             # Downloadable resume
    └── projects/
        └── portfolio-preview.svg # Vector preview of Developer Portfolio
```

---

## 🛠️ Quick Customization Guide

All personal placeholders are clearly marked with `<!-- EDITABLE -->` comments in `index.html`:

1. **Email Address**:
   - Configured as: `shahiaryaveer@gmail.com`
2. **GitHub & LinkedIn URLs**:
   - GitHub configured as: `https://github.com/Aryaveer-ops`
   - LinkedIn placeholder: `https://linkedin.com/in/aryaveershahi` (update with your real profile slug if needed).
3. **Resume File**:
   - Replace `assets/resume.pdf` with your real resume PDF file or update the `href` in the "Download Resume" button.
4. **Project Repositories & Live Demos**:
   - Update `data-url` and `href` attributes in the `#projects` section to point to your live hosted apps (e.g. GitHub Pages, Vercel, Streamlit Cloud).
5. **Contact Form Backend Integration**:
   - In `index.html`, the contact form validates input via JavaScript. To enable direct email delivery, simply connect it to a free service like [Formspree](https://formspree.io) by setting `action="https://formspree.io/f/YOUR_FORM_ID"` and `method="POST"` on `<form id="contact-form">`, or integrate with [EmailJS](https://www.emailjs.com/).

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or serve it using any lightweight static server:

### Option A: Direct Open
Double-click `index.html` to open in Chrome, Edge, Safari, or Firefox.

### Option B: VS Code Live Server
Right-click `index.html` in VS Code and click **Open with Live Server**.

### Option C: Python HTTP Server (if installed)
```bash
python -m http.server 3000
```
Then navigate to `http://localhost:3000`.

---

## 📜 Technology Stack

- **HTML5**: Semantic tags, accessibility attributes (`aria-*`), OpenGraph metadata.
- **CSS3**: CSS Custom Properties, CSS Grid, Flexbox, Keyframe animations, backdrop-filter.
- **Vanilla JavaScript**: Modern ES6+, DOM manipulation, Canvas API, IntersectionObserver.
- **Fonts**: Space Grotesk (Headings), Inter (Body copy), Fira Code (Technical tags).
- **Icons**: Font Awesome 6.
