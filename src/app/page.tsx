'use client';

import { useState, useEffect } from 'react';
import FontCard from '@/components/FontCard';
import FontPreview from '@/components/FontPreview';
import { downloadAllFonts } from '@/utils/download';

interface Font {
  id: string;
  name: string;
  tibetanName?: string;
  filename: string;
  category: string;
}

export default function Home() {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [selectedFont, setSelectedFont] = useState<Font | null>(null);
  const [customText, setCustomText] = useState('སྨོན་ལམ་བོད་ཡིག');
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['དབུ་ཅན།', 'འཁྱུག', 'ལཉྫ།', 'འབྲུ་ཚ།', 'དབུ་མེད་'];

  // Load fonts from API
  useEffect(() => {
    const loadFonts = async () => {
      try {
        const response = await fetch('fonts.json');
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

  const filteredFonts = selectedCategory
    ? fonts.filter(font => font.category === selectedCategory)
    : fonts;

  const handleDownloadAll = async () => {
    setIsDownloadingAll(true);
    try {
      await downloadAllFonts(filteredFonts);
    } finally {
      setIsDownloadingAll(false);
    }
  };

  const handleDownloadKeyboard = () => {
    const link = document.createElement('a');
    link.href = 'keyboard/MonlamKeyboard.zip';
    link.download = 'MonlamKeyboard.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="min-h-screen bg-white">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Custom Text Input and Download Buttons */}
        <div className="mb-4 sm:mb-6 flex gap-3 items-start">
          <div className="relative flex-1 max-w-2xl">
            <input
              type="text"
              id="custom-text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full px-4 py-2 pr-10 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-all duration-200 text-base"
              placeholder="Enter Tibetan text to preview..."
            />
            <button
              onClick={() => setCustomText('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 text-slate-500 hover:text-slate-700 rounded transition-all duration-200"
              title="Clear text"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={handleDownloadAll}
              disabled={isDownloadingAll}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded transition-all duration-200 whitespace-nowrap font-semibold text-sm sm:text-base ${
                isDownloadingAll 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'hover:opacity-90'
              } text-white`}
              style={{ backgroundColor: isDownloadingAll ? undefined : '#091c3a' }}
            >
              {isDownloadingAll ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span className="hidden sm:inline">Downloading...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="hidden sm:inline">Download All</span>
                  <span className="sm:hidden">All</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownloadKeyboard}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded transition-all duration-200 whitespace-nowrap font-semibold text-sm sm:text-base hover:opacity-90 text-white"
              style={{ backgroundColor: '#091c3a' }}
              title="Download Keyboard"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden sm:inline">Keyboard</span>
              <span className="sm:hidden">KB</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-6 sm:mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 text-sm font-medium rounded transition-all ${
              selectedCategory === null
                ? 'bg-[#091c3a] text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded transition-all ${
                selectedCategory === category
                  ? 'bg-[#091c3a] text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {category}
            </button>
          ))}
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
          <div className="grid grid-cols-1 gap-6 sm:gap-8">
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