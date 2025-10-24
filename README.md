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

### Production Build

```bash
npm run build
npm start
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

4. **Restart the application**
   ```bash
   npm run build
   npm start
   ```

### Removing Fonts

1. **Delete font files**

   ```bash
   # Remove unwanted fonts from:
   public/fonts/
   ```

2. **Restart the application**
   ```bash
   npm run build
   npm start
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
tibetan-font-viewer/
├── public/
│   └── fonts/           # Font files directory
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── page.tsx    # Main page
│   │   └── api/        # API routes
│   ├── components/     # React components
│   └── utils/          # Utility functions
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose setup
└── nginx.conf          # Nginx configuration
```

## API Endpoints

- `GET /api/fonts` - Get list of available fonts
- `GET /api/health` - Health check endpoint

## Deployment

### Docker Deployment

1. **Build Docker image**

   ```bash
   docker build -t monlam-font-viewer .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

### Nginx Deployment

1. **Use the provided Nginx configuration**

   ```bash
   cp nginx.conf /etc/nginx/sites-available/
   ```

2. **Enable the site**
   ```bash
   ln -s /etc/nginx/sites-available/nginx.conf /etc/nginx/sites-enabled/
   ```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **Components** - Add to `src/components/`
2. **API Routes** - Add to `src/app/api/`
3. **Utilities** - Add to `src/utils/`

## Troubleshooting

### Fonts Not Loading

1. **Check file format** - Ensure fonts are `.ttf` or `.otf`
2. **Check file location** - Fonts must be in `public/fonts/`
3. **Restart application** - Run `npm run build && npm start`

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
