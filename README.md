# TAP TRUST — Demo Studio & Static Website

A responsive, GitHub Pages-ready website and 4-industry interactive **Demo Studio** for TAP TRUST physical NFC stands and QR codes.

## What's included

```
Tap-Trust/
├── index.html                  # TAP TRUST brand homepage & solutions overview
├── assets/
│   ├── style.css               # Core website design system & responsive layout
│   ├── script.js               # Homepage mobile menu & intersection observer
│   ├── demo-studio.css         # Demo Studio design system (Apple HIG fluid motion, tokens, modals)
│   └── demo-studio.js          # Studio interaction engine (accessible modal dialogs, tabs, simulated actions)
└── demo/
    ├── index.html              # Demo Studio Hub (industry directory, flow explanation, phone+stand visual)
    └── pages/
        ├── salon.html          # Demo 01: Barber & Salon (Morrow Studio — reviews, booking, price list)
        ├── cafe.html           # Demo 02: Café & Restaurant (Slow Morning Café — contactless menu, Wi-Fi, table reserve)
        ├── property.html       # Demo 03: Real Estate (The Pavilion Court — interactive gallery, floor plan, viewing request)
        └── stay.html           # Demo 04: Hotel & Guest Stay (The Koya House — in-room Wi-Fi, house rules, neighborhood guide)
```

## Preview locally

Run a local HTTP server from this root directory:

```bash
# Using Python
python -m http.server 8080

# Or using Node
npx serve .
```

Then visit:
- Homepage: `http://localhost:8080/`
- Demo Studio Hub: `http://localhost:8080/demo/`
- Salon Demo: `http://localhost:8080/demo/pages/salon.html`
- Café Demo: `http://localhost:8080/demo/pages/cafe.html`
- Real Estate Demo: `http://localhost:8080/demo/pages/property.html`
- Hotel Stay Demo: `http://localhost:8080/demo/pages/stay.html`

## GitHub Pages Deployment

The site is built with strictly relative paths (`../`, `../../`, etc.) and zero build dependencies. It works seamlessly under:
- GitHub Pages project paths (e.g. `https://ansh-sen.github.io/Tap-Trust/` and `/Tap-Trust/demo/`)
- Custom apex domains (e.g. `https://example.com/`)
- Local filesystem preview (`file:///...`)

To deploy to GitHub Pages:
1. Merge the `feature/demo-studio-redesign` branch into `main`.
2. Push `main` to `origin`.
3. In repository **Settings → Pages**, ensure **Source** is set to `Deploy from a branch` (`main`, `/ (root)`).

## Design & Motion Foundations (Apple HIG)

The redesigned Demo Studio follows the motion, accessibility, and interaction principles outlined in Apple WWDC design talks (*Designing Fluid Interfaces* & *WWDC Typography/Craft*):
1. **Instant Response on Press**: Tactile feedback on pointer-down (`:active` scale), killing click latency.
2. **Translucent Materials**: Subtle backdrop-filter layers with light top edges and high-contrast typography.
3. **Interruptible Accessible Dialogs**: Simulated actions open in an accessible dialog with `Escape` key listeners, focus restoration, backdrop dismissals, and honest demo disclosures.
4. **Accessible Reduced-Motion**: Full `@media (prefers-reduced-motion: reduce)` support replacing physical transforms with clean instant cross-fades.
5. **High-Contrast Support**: Clean boundaries and WCAG AA color ratios for dark ink on warm paper surfaces.

## Demo Disclosures

All business names (Morrow Studio, Slow Morning Café, Linden & Co., The Koya House), addresses, menus, service prices, property valuations, and guest credentials are fictional mockups created solely to demonstrate how TAP TRUST hardware bridges physical foot traffic to digital action.
