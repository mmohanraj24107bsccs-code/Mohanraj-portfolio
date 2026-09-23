# Mohan Raj M — 3D Portfolio

Static site (HTML, CSS, JS) with Three.js + GSAP from CDN. No build step.

## How to Run Locally

### Option 1: Using Node.js (Recommended)
Run the following command in terminal:
```bash
node run.js
```
or
```bash
npm start
```
This automatically starts a local server at `http://localhost:3000` and opens your default browser!

### Option 2: Live Server in VS Code
1. Open this folder in VS Code.
2. Right-click `index.html` → **Open with Live Server**.

## Push to GitHub
```bash
git init
git add .
git commit -m "Add portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```
Then on GitHub: **Settings → Pages → Deploy from branch → main / root** to get a live link.

## Edit before publishing
- Email and social links: bottom of `index.html` (`#contact`)
- Project cards 2 and 3: `index.html` (`#work`)
- Photo: replace `assets/mohan.png`
