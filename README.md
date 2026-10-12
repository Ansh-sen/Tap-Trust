# TAP TRUST — static demo website

A responsive, GitHub Pages-ready brand website and fictional salon customer-page demo.

## What's included
- `index.html` — TAP TRUST brand page, how it works, solutions and illustrative pilot pricing.
- `demo/index.html` — fictional Morrow Studio customer experience.
- `assets/style.css` — responsive visual system and page styling.
- `assets/script.js` — mobile navigation, demo action feedback and reduced-motion-aware reveal effects.

## Preview locally
Open `index.html` in a browser. For a more reliable local preview, run a static server from this folder:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Publish on GitHub Pages
1. Create a public repository named `tap-trust` (or another name you prefer).
2. Upload the contents of this folder to the repository root, preserving the `assets/` and `demo/` folders.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
5. When GitHub provides the site URL, test both the homepage and `/demo/` on mobile data.

GitHub Pages guide: https://docs.github.com/en/pages/quickstart

## Design direction
The visual system uses warm paper-like surfaces, ink-black typography, a muted green signal color, restrained editorial serif accents, generous spacing, and one custom NFC stand/phone illustration. It borrows design-review principles from Apple's Human Interface Guidelines—clarity, accessibility, predictable interaction, and reduced-motion support—while keeping the web experience distinct from a native Apple interface.

## Before real customer use
- All Morrow Studio details are fictional. Do not present the page as a real business.
- Replace the sample action handlers with the customer's actual Google review, booking, Instagram and WhatsApp URLs.
- Replace the demo rating and opening hours with verified details, or remove them.
- Current package prices are explicitly marked as illustrative test prices.
- For the first physical prototype, encode the published `https://.../demo/` URL in the NFC tag and create a QR code containing the exact same URL. For a real client, use a client-specific destination.
- A static GitHub Pages site cannot securely manage editable customer redirects or a customer database by itself. Add a redirect service/backend only after validating demand.
