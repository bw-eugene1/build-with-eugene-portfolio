# Build with Eugene (BWE) — Portfolio Website

A complete 5-page professional portfolio website for **Build with Eugene**, a digital services brand based in Ghana offering web design, e-commerce development, software solutions and graphic design.

---

## File Structure

```
Build-With-Eugene/
├── index.html          → Homepage (hero, about preview, tech stack, services, projects, design, CTA)
├── about.html          → About page (bio, values, tech preview, CTA)
├── services.html       → Services page (4 detailed service blocks, process steps, CTA)
├── projects.html       → Projects page (video cards grid, graphic design gallery, CTA)
├── contact.html        → Contact page (info card, contact form, FAQ accordion)
├── css/
│   └── style.css       → Full stylesheet (24 organized sections)
├── js/
│   └── script.js       → All JavaScript (8 organized sections)
├── README.md           → This file
└── assets/             → DO NOT MOVE OR RENAME
    ├── website-icon/   → BWE logo (500×500px transparent PNG)
    ├── profile/        → Eugene's profile photo
    ├── graphic-design/ → 4 graphic design images
    ├── icons/          → Tech stack icons (WordPress, WooCommerce, MySQL, Python)
    └── website-projects/ → 4 website demo videos
```

---

## How to View the Website Locally

Simply open `index.html` in any modern web browser:

```
File > Open File > index.html
```

**Or** double-click `index.html` in File Explorer.

> **Note:** For the best experience (especially for videos), you may want to serve the files through a local web server rather than opening them directly from disk. You can use VS Code's Live Server extension, or any simple HTTP server.

### Using VS Code Live Server
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code
2. Open the `Build-With-Eugene` folder in VS Code
3. Right-click `index.html` → "Open with Live Server"

### Using Python (if installed)
```bash
cd "C:\Users\Eugene Morat\Desktop\Build-With-Eugene"
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

---

## Outstanding TODO Items

### 🔴 REQUIRED — Contact Form (Formspree)
The contact form on `contact.html` requires a Formspree account to deliver messages.

**Steps to activate:**
1. Go to [https://formspree.io](https://formspree.io) and create a free account
2. Create a new form in the Formspree dashboard
3. Copy your form's endpoint ID (looks like `f/abcdefgh`)
4. Open `contact.html` and replace `YOUR_FORM_ID` in this line:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   With your actual ID, e.g.:
   ```html
   <form id="contact-form" action="https://formspree.io/f/xpzgkwqr" method="POST">
   ```

### 🟡 CONFIRM — Email Address
The email `buildwitheugene.it@gmail.com` is currently displayed as **plain text only** on all pages (not a clickable mailto link).

Before making it a clickable link, please **confirm this is the correct email address**. Search for `TODO: Confirm correct email` in the HTML files to find all instances.

Once confirmed, replace:
```html
<span>buildwitheugene.it@gmail.com</span>
```
With:
```html
<a href="mailto:buildwitheugene.it@gmail.com">buildwitheugene.it@gmail.com</a>
```

---

## Brand Details

| Property | Value |
|----------|-------|
| Brand Name | Build with Eugene |
| Short Name | BWE |
| Primary Color | `#0066FF` (Electric Blue) |
| Font | Inter (Google Fonts) |
| WhatsApp | +233 50 880 0582 |
| Twitter/X | @bw_eugene1 |

---

## Browser Support

Built for all modern browsers:
- Chrome / Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Android)

---

## To Deploy Online

Options for hosting this static website:
- **Netlify** (drag & drop the folder) — [netlify.com](https://netlify.com)
- **Vercel** — [vercel.com](https://vercel.com)
- **GitHub Pages** — push to a GitHub repo and enable Pages
- **cPanel hosting** — upload via FTP to public_html

---

*Built by Antigravity for Build with Eugene © 2024*
