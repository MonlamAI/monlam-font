# Monlam Font Viewer

A beautiful web application for previewing and downloading Monlam Tibetan fonts. Built with Next.js, React, and Tailwind CSS.

## Features

- 🔤 **Tibetan Alphabet Preview** - See complete character sets for each font
- ✍️ **Custom Text Input** - Preview your own Tibetan text
- 📱 **Responsive Design** - Works on desktop and mobile
- ⬇️ **Download Fonts** - Download individual fonts or all fonts at once
- 🎨 **Beautiful UI** - Modern, clean interface with gradients and animations

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd tibetan-font-viewer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Production Build (Static export)

```bash
npm run clean && npm run build
# Output: the static site is generated in the out/ directory

# Optional: preview locally
npx serve out
```

## Font Management

### Adding New Fonts

Since the admin panel has been removed, you can add fonts manually:

1. **Add font files to the fonts directory**

   ```bash
   # Copy your .ttf or .otf files to:
   public/fonts/
   ```

2. **Supported file formats**

   - `.ttf` (TrueType)
   - `.otf` (OpenType)

3. **Font naming**

   - Use descriptive names
   - Avoid special characters
   - Example: `Monlam-New-Font.ttf`

4. **Rebuild to refresh font list (fonts.json)**
   ```bash
   # Generates public/fonts.json and builds static site to out/
   npm run build
   ```

### Removing Fonts

1. **Delete font files**

   ```bash
   # Remove unwanted fonts from:
   public/fonts/
   ```

2. **Rebuild to refresh font list (fonts.json)**
   ```bash
   npm run build
   ```

### Font Categories

Fonts are automatically categorized based on filename:

- **Monlam Classic** - Contains "monlam ouchan"
- **Monlam Unicode** - Contains "monlam uni" or "monlam"
- **TCRC** - Contains "tcrc"
- **Classic** - Contains "himalaya"
- **Other** - Default category

## Project Structure

```
monlam-font/
├── public/
│   ├── fonts/                 # Font files directory (.ttf, .otf)
│   └── fonts.json             # Generated font catalog used by the UI
├── scripts/
│   └── generate-fonts-json.mjs# Build-time generator for public/fonts.json
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── page.tsx           # Main page (client)
│   │   ├── layout.tsx         # Root layout (client FontLoader)
│   │   └── api/               # API routes (disabled for static export)
│   ├── components/            # React components
│   └── utils/                 # Utility functions
├── next.config.js             # output: 'export' (static)
└── package.json               # scripts incl. prebuild to generate fonts.json
```

## Static Data (replaces API endpoints)

- `public/fonts.json` - The UI loads the font list from this file at runtime.
  - It is generated automatically during `npm run build` by `scripts/generate-fonts-json.mjs`.
  - If you add or remove fonts, run `npm run build` to refresh it.
- The `/api/fonts` and `/api/health` endpoints are disabled in static mode (no server on GitHub Pages).

## Deployment

### GitHub Pages (recommended)
1. Build the static site:
   ```bash
   npm run clean && npm run build
   ```
2. Deploy the `out/` directory to GitHub Pages:
   - Option A: Push `out/` to a `gh-pages` branch and set Pages to that branch.
   - Option B: Use a GitHub Action to publish `out/` to Pages.
3. Project pages (https://username.github.io/repo-name):
   - This app uses relative asset paths, so it works under a subpath.
   - You can optionally set `basePath`/`assetPrefix` in `next.config.js` to `/repo-name`.

### Legacy server deployments (optional)
- Docker and Nginx configs can be used for server hosting, but are unnecessary for GitHub Pages.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run clean` - Remove `.next` and `out/`
- `npm run build` - Generate `public/fonts.json` and static site to `out/`
- `npm start` - Start production server (legacy; not used for GitHub Pages)
- `npm run lint` - Run ESLint

Note: During development, if you add/remove fonts and want the UI to reflect changes without a full build, run:
```bash
node scripts/generate-fonts-json.mjs
```
This updates `public/fonts.json` that the dev server reads.

### Adding New Features

1. **Components** - Add to `src/components/`
2. **API Routes** - `src/app/api/` (disabled in static export)
3. **Utilities** - Add to `src/utils/`

## Troubleshooting

### Fonts Not Loading

1. **Check file format** - Ensure fonts are `.ttf` or `.otf`
2. **Check file location** - Fonts must be in `public/fonts/`
3. **Regenerate font list** - Run `npm run build` (or `node scripts/generate-fonts-json.mjs` during dev)
4. **Confirm fonts.json** - Ensure `public/fonts.json` includes your new fonts

### Security/Headers
- Custom response headers from `next.config.js` (e.g., `X-Frame-Options`, `Cache-Control`) do not apply on GitHub Pages, since there is no Next.js server. If you need custom headers, consider a host that supports them (e.g., Vercel/Netlify) or a CDN/proxy like Cloudflare.

### Health Check
- The `/api/health` endpoint was removed in static mode. External uptime checks against it will 404 on Pages.

### Build Errors

1. **Clear cache** - Delete `.next` folder and rebuild
2. **Check dependencies** - Run `npm install`
3. **TypeScript errors** - Check for type mismatches

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:

1. Check the troubleshooting section
2. Review the project structure
3. Open an issue on GitHub

---

**Monlam Font Viewer** - Beautiful Tibetan font preview and download experience 🎉
