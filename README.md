# Recaps

A React single-page app for the Recaps brand, with animated backgrounds, text effects, and a playful visual identity built around a black/white/orange palette.

## Pages

- **Home** (`/`) — landing page with a randomized animated background (MetaBalls, FutureSplash, Smoothing, or Voronoi) and a shine-effect card.
- **Artists** (`/artists`) — artist directory with a rolling 3D heading animation.
- **News** (`/news`) — news feed with a scramble-text heading.
- **Game** (`/game`) — game page.

## Stack

- React 19 + React Router 7
- Vite 7
- Tailwind CSS 4
- GSAP, Paper.js, and Voronoi for animations and generative backgrounds

## Getting started

```bash
npm install
npm start      # dev server on http://localhost:4444
npm run build  # production build
npm run preview
```

## Project layout

```
src/
├── App.jsx
├── main.jsx
├── index.css              # Tailwind theme + shine-card styles
├── assets/                # images, icons, artist art
├── components/
│   ├── backgrounds/       # Paper.js / generative backgrounds
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── RollingText.jsx
│   ├── ScrambleText.jsx
│   └── *Loader.jsx        # decorative loaders
├── hooks/
│   └── useShineEffect.js  # pointer-tracked shine highlight
└── pages/
    ├── Home.jsx
    ├── Artists/
    ├── News/
    └── Game.jsx
```

Path aliases (`assets`, `components`, `hooks`, `pages`) are configured in [vite.config.js](vite.config.js).
