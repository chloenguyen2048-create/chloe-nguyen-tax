# Chloe Nguyen Tax Advisory

Bilingual (English / Tiếng Việt) marketing site built with React + Vite.

## Develop
```bash
npm install
npm run dev      # http://localhost:5173/chloe-nguyen-tax/
npm run build    # outputs to dist/
```

## Edit content
All text (both languages) lives in `src/content.js`. Update `CONTACT` with the real phone and email before launch.

## Deploy
Every push to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
If you rename the repo or use a custom domain, update `base` in `vite.config.js`.
