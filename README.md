# Stella Xin Yin — personal academic website

Live website: https://stellayin06.github.io/

This is a static HTML, CSS, and JavaScript website. It does not require Jekyll, Node.js dependencies, or a build step.

## Editing content

| File | Content |
| --- | --- |
| `index.html` | Biography, research themes, updates, teaching, and contact information |
| `data.js` | Selected papers and full publication list |
| `style.css` | Colors, fonts, spacing, and responsive layout |
| `app.js` | Publication search, filters, figure viewer, and mobile navigation |
| `assets/portrait.webp` | Profile photograph |
| `assets/figure-0.webp` to `assets/figure-8.webp` | Figures for selected papers |
| `assets/posters/` | Original paper PDFs; preserve filenames to keep existing links working |

When adding publications, update the displayed publication counts in `index.html` and the available year options when needed. Selected figure filenames follow each paper's `id` in `data.js`. Update figure descriptions and source links with the corresponding paper.

## Local preview

From the repository root, run:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000/.

## Publishing

Commit changes to the `main` branch. The existing GitHub Pages configuration publishes the website automatically. Check the **pages build and deployment** run in the repository's Actions tab.

Keep `.nojekyll` in the repository root so GitHub Pages serves the site without Jekyll processing.

The site uses Google Fonts with local font fallbacks. Its images, scripts, and stylesheet are stored in this repository.

## Cleanup and recovery

Unused files from the previous Jekyll website were removed in one cleanup commit. The current website files and all existing paper PDFs were retained. Deleted files remain available in Git history and can be restored if needed.
