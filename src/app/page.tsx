'use client';

import { useState, useEffect } from 'react';
import FontCard from '@/components/FontCard';
import FontPreview from '@/components/FontPreview';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  const categories = ['All', ...Array.from(new Set(fonts.map(font => font.category)))];
  
  const filteredFonts = fonts.filter(font => {
    const matchesSearch = font.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || font.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownloadAll = async () => {
    setIsDownloadingAll(true);
    try {
      await downloadAllFonts(filteredFonts);
    } finally {
      setIsDownloadingAll(false);
    }
  };

  const refreshFonts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/fonts');
      if (response.ok) {
        const data = await response.json();
        setFonts(data.fonts);
      }
    } catch (error) {
      console.error('Error refreshing fonts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-indigo-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Monlam Font Viewer
              </h1>
              <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg">Preview and compare Monlam Tibetan fonts with beautiful typography</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <CategoryFilter 
                categories={categories} 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
              />
              <button
                onClick={refreshFonts}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg sm:rounded-xl transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <a
                href="/admin/login"
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700 text-white rounded-lg sm:rounded-xl transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="hidden sm:inline">Admin</span>
              </a>
              <button
                onClick={handleDownloadAll}
                disabled={isDownloadingAll}
                className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 whitespace-nowrap font-semibold text-sm sm:text-base ${
                  isDownloadingAll 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:scale-105 shadow-lg hover:shadow-xl'
                } text-white`}
              >
                {isDownloadingAll ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download All
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Custom Text Input */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-200/50 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <label htmlFor="custom-text" className="block text-base sm:text-lg font-semibold text-slate-700 mb-3 sm:mb-4">
            ✍️ Custom Text (Tibetan)
          </label>
          <textarea
            id="custom-text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200/50 focus:border-indigo-400 transition-all duration-300 text-base sm:text-lg"
            rows={2}
            placeholder="Enter Tibetan text to preview..."
          />
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
        />
      )}
    </div>
  );
}