# Elect The Hottie ($ETH) — complete static website

A responsive, interactive landing page based on the approved full-page mockup. The original photo and design references were supplied/created within the conversation; all images ship locally in `assets/`.

## Getting started

You can deploy all contents of this folder directly to **Netlify, GitHub Pages, AWS Amplify static hosting, or any web server**. No Node.js or build tools are required.

For local testing, from this folder:

```bash
python -m http.server 8080
```

Then open http://localhost:8080.

## Included sections

1. Hero / iconic candidate portrait
2. The Campaign / visual narrative
3. The Story / nine clickable chapters with next/previous modal
4. Cinematic oval-office quote scene
5. Tokenomics / 1B supply, 0% tax, Uniswap V4, planned LP lock
6. Contract placeholder with copy button
7. How To Buy / Ethereum and Uniswap instructions
8. Eight-picture gallery, expandable lightbox
9. Election HQ / four functional tabs with fictional content
10. Join the Movement / community section
11. Final victory scene and footer

The page includes responsive mobile navigation, image lazy-loading, accessible buttons, scroll-reveal animation, keyboard lightbox navigation, reduced-motion support and SEO metadata.

## Important launch steps

- **Contract Address:** `Coming Soon..` is deliberately a placeholder. Replace the element with ID `contract-text` inside `index.html` once the genuine deployed token address is confirmed. Also update the `copy-ca` button behavior if you want direct copying of the address.
- **Social links:** No X or Telegram URLs were supplied, so those controls open a notice rather than sending visitors to unverified accounts. Once they exist, update the `.social-link` handlers in `script.js` or replace them with validated external links.
- **Liquidity:** The website says **planned at launch**, rather than claiming liquidity is already locked.
- **Ticker collision:** `$ETH` is also Ethereum's native ticker. Publish the correct, verified token address prominently; do not let buyers mistake the native ETH asset for this project.
- **Election parody:** This is an independent fictional entertainment brand; no government office, actual candidate or election endorsement is implied. Election HQ content is fictional, not live polling or official results.
- **Art:** All scene cards are individually saved webp files. If you obtain higher-resolution standalone scene artwork, replace the files in `assets/` without changing layout code.

## File structure

- `index.html` — full page markup and metadata
- `styles.css` — desktop/mobile layout and effects
- `script.js` — navigation, lightboxes, tabs, notifications
- `assets/` — all locally hosted images
- `preview/` — rendered screenshots used during QA
- `assets/design-reference.webp` — original approved full-page concept for side-by-side comparison
