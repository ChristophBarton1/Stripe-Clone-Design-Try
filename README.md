<div align="center">

# PayFlow: Landing Page Design Study

**A fintech landing page inspired by Stripe, with a WebGL shader hero and animated React sections.**

![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![WebGL](https://img.shields.io/badge/WebGL-990000?style=flat-square&logo=webgl&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

</div>

---

## About

A design and front-end study that recreates the look and motion of Stripe's landing page for a fictional payments brand, **PayFlow** (copy in German). The focus is the animated hero: a custom GLSL noise shader and canvas-drawn ribbons. The rest of the page is built from small React components.

> Personal learning project. Not affiliated with or endorsed by Stripe.

## Highlights

- **WebGL shader hero:** a fragment shader with simplex noise and fractal Brownian motion that reacts to mouse movement.
- **Canvas ribbons:** flowing gradient ribbons drawn on a 2D canvas with `requestAnimationFrame`.
- **Component sections:** nav, hero, logo carousel, bento grid, developer section, stats, enterprise, news, CTA and footer.
- **Scroll reveals:** sections animate in via `IntersectionObserver`.
- **No build step at runtime:** the JSX is precompiled with Babel ahead of time, so the page runs on plain React UMD scripts. This cut the HTML from about 1.5 MB to about 32 KB.
- **Details:** self-hosted DM Sans variable font, CSS custom-property theming, meta/Open Graph tags, a `<main>` landmark and contrast tweaks.

## Tech stack

- React 18 (UMD, precompiled JSX)
- WebGL / GLSL, Canvas 2D
- HTML5, CSS3 (custom properties)

## Run locally

No install needed. Serve the folder with any static server:

```bash
npx serve .
```

Then open the printed URL. Opening `index.html` directly also works in most browsers.

---

<div align="center">

Built by [Christoph Barton](https://christophbarton.com)

</div>
