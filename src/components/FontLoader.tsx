'use client';

import { useEffect, useState } from 'react';
import { loadFonts, preloadFonts } from '@/utils/fontLoader';

export default function FontLoader() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const loadAllFonts = async () => {
      try {
        // Preload fonts for better performance
        preloadFonts();
        
        // Fonts are now loaded dynamically from the API
        // This component is kept for compatibility
        setLoadingProgress(100);
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
