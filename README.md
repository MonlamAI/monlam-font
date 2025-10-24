# Monlam Font Viewer

A Next.js web application for previewing and comparing Monlam Tibetan fonts, similar to wordmark.it. This application allows you to view all Monlam fonts in your collection with custom text input and detailed font information.

## Features

- **Font Preview**: View all Monlam fonts with sample text
- **Custom Text Input**: Enter your own Tibetan text to preview
- **Search & Filter**: Search fonts by name and filter by category
- **Detailed View**: Click on any font to see detailed preview with multiple sample texts
- **Responsive Design**: Works on desktop and mobile devices
- **Font Loading**: Automatic font loading with progress indicator

## Available Fonts

The application includes the following Monlam font categories:

- **Monlam Classic**: Monlam Ouchan series (1-4) - Traditional Monlam fonts
- **Monlam Unicode**: Unicode versions of Monlam fonts for modern applications

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the project directory:

```bash
cd tibetan-font-viewer
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Browse Fonts**: The main page shows all available fonts in a grid layout
2. **Custom Text**: Enter your own Tibetan text in the text area at the top
3. **Search**: Use the search bar to find specific fonts by name
4. **Filter**: Use the category dropdown to filter fonts by type
5. **Preview**: Click on any font card to see a detailed preview
6. **Close Preview**: Click the X button or outside the modal to close

## Font Categories

- **All**: Shows all available fonts
- **Monlam**: Monlam font series
- **Monlam Unicode**: Unicode versions of Monlam fonts
- **TCRC**: TCRC font family
- **Classic**: Traditional fonts
- **Unicode**: Standard Unicode fonts

## Sample Texts

The application includes various Tibetan sample texts:

- Om Mani Padme Hum (ཨོཾ་མ་ཎི་པདྨེ་ཧཱུྃ)
- Tibetan alphabet sequences
- Common Tibetan phrases
- Religious texts

## Technical Details

- Built with Next.js 14 and TypeScript
- Styled with Tailwind CSS
- Font loading with progress tracking
- Responsive design for all screen sizes
- Font fallbacks for better compatibility

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with font loading
│   ├── page.tsx           # Main application page
│   └── globals.css        # Global styles
├── components/
│   ├── FontCard.tsx       # Individual font preview card
│   ├── FontPreview.tsx    # Detailed font preview modal
│   ├── FontLoader.tsx     # Font loading component
│   ├── SearchBar.tsx      # Search functionality
│   └── CategoryFilter.tsx # Category filtering
├── data/
│   └── fonts.ts          # Font definitions and sample texts
└── utils/
    └── fontLoader.ts     # Font loading utilities
```

## Customization

To add new fonts:

1. Add the font file to `public/fonts/`
2. Update the `tibetanFonts` array in `src/data/fonts.ts`
3. The font will automatically appear in the application

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is open source and available under the MIT License.
