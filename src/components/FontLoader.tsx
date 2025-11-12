'use client';

import { useEffect, useState } from 'react';
import { loadFont } from '@/utils/fontLoader';

interface Font {
  id: string;
  name: string;
  filename: string;
  category: string;
}

export default function FontLoader() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const loadAllFonts = async () => {
      try {
        // Fetch fonts from static JSON
        const response = await fetch('fonts.json');
        if (!response.ok) {
          throw new Error('Failed to fetch fonts');
        }
        
        const data = await response.json();
        const fonts: Font[] = data.fonts || [];
        
        if (fonts.length === 0) {
          setFontsLoaded(true);
          return;
        }

        // Load fonts with progress tracking
        let loaded = 0;
        const total = fonts.length;
        
        // Load fonts in batches to show progress
        for (const font of fonts) {
          try {
            await loadFont(font.name, font.filename);
            loaded++;
            setLoadingProgress(Math.round((loaded / total) * 100));
          } catch (error) {
            console.error(`Error loading font ${font.name}:`, error);
            loaded++;
            setLoadingProgress(Math.round((loaded / total) * 100));
          }
        }
        
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFontsLoaded(true); // Continue even if some fonts fail to load
      }
    };

    loadAllFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Tibetan fonts...</p>
          <div className="w-64 bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">{Math.round(loadingProgress)}% loaded</p>
        </div>
      </div>
    );
  }

  return null;
}
