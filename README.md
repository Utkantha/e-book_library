# NovaReads / E-BOOK LIBRARY

A colorful, free eBook landing + download experience with sample catalog, search, filters, and a demo email/password modal gate for downloads.

## Quick start (static)
1) Open `index.html` in your browser for the main landing/library.
2) Open `download.html` for the gated downloads page.
3) Place your PDFs in `books/` matching the paths in `books.json` (e.g., `books/rich-dad-poor-dad.pdf`).

## Optional: run with Flask
```bash
py -m pip install flask
python server.py
# visit http://localhost:5000
```
- `server.py` serves the static files and exposes `/api/books` plus `/books/<file>` for direct PDFs.

## Auth note
- The login/signup modal is front-end only. It stores a demo flag in `localStorage` to unlock buttons. Swap the alert + flag for real backend auth when ready.

## Customizing
- Update branding/text in `index.html` and `download.html`.
- Tune colors/layout in `style.css`.
- Add/remove titles in `books.json` and ensure matching PDFs exist in `books/`.

## Structure
- `index.html` — hero, featured grid, full library.
- `download.html` — E-BOOK LIBRARY heading, gated downloads.
- `style.css` — gradients, cards, modal styling.
- `script.js` — book rendering, filters, auth modal wiring.
- `books.json` — sample catalog (18 titles).

## Troubleshooting
- If `pip` is not recognized, use `py -m pip install flask` or add the Python Scripts path to your `PATH`. See earlier instructions in chat for Windows PATH fixes.

