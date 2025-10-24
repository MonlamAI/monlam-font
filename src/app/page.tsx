'use client';

import { useState, useEffect } from 'react';
import FontCard from '@/components/FontCard';
import FontPreview from '@/components/FontPreview';
import { downloadAllFonts } from '@/utils/download';

interface Font {
  id: string;
  name: string;
  filename: string;
  category: string;
}

export default function Home() {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [selectedFont, setSelectedFont] = useState<Font | null>(null);
  const [customText, setCustomText] = useState('ཨོཾ་མ་ཎི་པདྨེ་ཧཱུྃ');
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load fonts from API
  useEffect(() => {
    const loadFonts = async () => {
      try {
        const response = await fetch('/api/fonts');
        if (response.ok) {
          const data = await response.json();
          setFonts(data.fonts);
        } else {
          console.error('Failed to load fonts');
        }
      } catch (error) {
        console.error('Error loading fonts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFonts();
  }, []);

  const filteredFonts = fonts;

  const handleDownloadAll = async () => {
    setIsDownloadingAll(true);
    try {
      await downloadAllFonts(filteredFonts);
    } finally {
      setIsDownloadingAll(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Custom Text Input */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-200/50 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <label htmlFor="custom-text" className="block text-base sm:text-lg font-semibold text-slate-700">
              ✍️ Custom Text (Tibetan)
            </label>
            <button
              onClick={() => setCustomText('')}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          </div>
          <textarea
            id="custom-text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200/50 focus:border-indigo-400 transition-all duration-300 text-base sm:text-lg"
            rows={2}
            placeholder="Enter Tibetan text to preview..."
          />
        </div>

        {/* Download All Button */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <button
            onClick={handleDownloadAll}
            disabled={isDownloadingAll}
            className={`flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 whitespace-nowrap font-semibold text-base sm:text-lg ${
              isDownloadingAll 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:scale-105 shadow-lg hover:shadow-xl'
            } text-white`}
          >
            {isDownloadingAll ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Downloading...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download All Fonts
              </>
            )}
          </button>
        </div>

        {/* Font Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-slate-600 text-lg">Loading fonts...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredFonts.map((font) => (
              <FontCard
                key={font.id}
                font={font}
                sampleText={customText}
                onClick={() => setSelectedFont(font)}
                isSelected={selectedFont?.id === font.id}
              />
            ))}
          </div>
        )}

        {/* No results message */}
        {filteredFonts.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-200/50 p-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-slate-600 text-xl font-medium">No fonts found matching your criteria.</p>
              <p className="text-slate-500 mt-2">Try adjusting your search or filter settings.</p>
            </div>
          </div>
        )}
      </main>

      {/* Font Preview Modal */}
      {selectedFont && (
        <FontPreview
          font={selectedFont}
          sampleText={customText}
          onClose={() => setSelectedFont(null)}
          onTextChange={setCustomText}
        />
      )}
    </div>
  );
}