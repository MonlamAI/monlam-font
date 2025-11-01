// Production-optimized font loading with error handling and performance monitoring

interface Font {
  id: string;
  name: string;
  filename: string;
  category: string;
}

// Store loaded fonts to avoid reloading
const loadedFonts = new Set<string>();

/**
 * Load a single font using the FontFace API
 */
export const loadFont = async (fontName: string, fontFilename: string): Promise<boolean> => {
  // Create a unique font family name
  const fontFamily = fontName;
  
  // Skip if already loaded
  if (loadedFonts.has(fontFamily)) {
    return true;
  }

  try {
    // Create the font URL
    const fontUrl = `/fonts/${encodeURIComponent(fontFilename)}`;
    
    // Use FontFace API if available
    if ('FontFace' in window) {
      const font = new FontFace(fontFamily, `url(${fontUrl})`, {
        style: 'normal',
        weight: '400',
        display: 'swap',
      });

      await font.load();
      document.fonts.add(font);
      loadedFonts.add(fontFamily);
      return true;
    } else {
      // Fallback: Use @font-face CSS injection
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: "${fontFamily}";
          src: url("${fontUrl}") format("truetype");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
      `;
      document.head.appendChild(style);
      loadedFonts.add(fontFamily);
      
      // Wait a bit for the font to be available
      await new Promise(resolve => setTimeout(resolve, 100));
      return true;
    }
  } catch (error) {
    console.error(`Error loading font ${fontName}:`, error);
    return false;
  }
};

/**
 * Load multiple fonts
 */
export const loadFonts = async (fonts: Font[]): Promise<void> => {
  const loadPromises = fonts.map(font => loadFont(font.name, font.filename));
  await Promise.allSettled(loadPromises);
};

/**
 * Preload fonts for better performance
 */
export const preloadFonts = async (fonts?: Font[]): Promise<void> => {
  if (fonts && fonts.length > 0) {
    await loadFonts(fonts);
  }
};

/**
 * Lazy load fonts
 */
export const lazyLoadFonts = async (fonts: Font[]): Promise<void> => {
  await loadFonts(fonts);
};