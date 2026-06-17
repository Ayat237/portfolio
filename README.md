# Ayat Mohamed — Portfolio

## Run locally

1. Make sure you have Node.js installed (version 18 or higher). Check with:
   ```
   node -v
   ```
   If you don't have it, download from https://nodejs.org

2. Open a terminal in this folder and install dependencies:
   ```
   npm install
   ```

3. Start the local dev server:
   ```
   npm run dev
   ```

4. Open the URL it prints (usually http://localhost:5173) in your browser.

## Build for deployment

```
npm run build
```

This creates a `dist/` folder with static HTML/CSS/JS you can upload to any static host
(Vercel, Netlify, GitHub Pages, etc).

## Edit your content

All your data (experience, projects, skills, bio) lives in the top of `src/Portfolio.jsx`
inside the `PROFILE`, `EXPERIENCE`, `PROJECTS`, `SKILL_GROUPS`, and `VOLUNTEER` objects/arrays.
Edit those directly — no need to touch the component code below them.
