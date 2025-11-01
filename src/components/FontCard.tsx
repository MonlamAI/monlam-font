'use client';

import { useEffect, useState } from 'react';
import { downloadFont } from '@/utils/download';
import { loadFont } from '@/utils/fontLoader';

interface Font {
  id: string;
  name: string;
  tibetanName?: string;
  filename: string;
  category: string;
}

interface FontCardProps {
  font: Font;
  sampleText: string;
  onClick: () => void;
  isSelected: boolean;
}

type FontSize = 'small' | 'medium' | 'large';

export default function FontCard({ font, sampleText, onClick, isSelected }: FontCardProps) {
  const fontFamily = `"${font.name}", sans-serif`;
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Ensure font is loaded when component renders
  useEffect(() => {
    loadFont(font.name, font.filename).catch(error => {
      console.error(`Failed to load font ${font.name}:`, error);
    });
  }, [font.name, font.filename]);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    await downloadFont(font.filename, font.name);
  };

  const handleSizeChange = (size: FontSize, e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Prevent card click
    setFontSize(size);
    setIsDropdownOpen(false);
  };

  const displayName = font.tibetanName || font.name;

  const sizeClasses = {
    small: 'text-lg sm:text-xl lg:text-2xl',
    medium: 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl',
    large: 'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl'
  };

  const sizeLabels = {
    small: 'Small',
    medium: 'Medium',
    large: 'Large'
  };

  return (
    <div
      className={`bg-white shadow-lg border cursor-pointer transition-all duration-300 hover:shadow-xl ${
        isSelected 
          ? 'ring-2 ring-indigo-400' 
          : 'border-slate-200'
      }`}
      onClick={onClick}
    >
      {/* Top Banner */}
      <div 
        className="px-4 sm:px-6 py-3 flex items-center justify-between text-white"
        style={{ backgroundColor: '#091c3a' }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm sm:text-base">{displayName}</span>
        </div>
        <span className="text-xs sm:text-sm opacity-90 whitespace-nowrap">
          དབྱེ་བ་ {font.category}
        </span>
      </div>

      {/* Main Content */}
      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          {/* Large Font Preview - Wider */}
          <div className="flex-1 min-w-0">
            <div
              className={`${sizeClasses[fontSize]} font-bold text-slate-900 break-words`}
              style={{ fontFamily }}
            >
              {sampleText}
            </div>
          </div>

          {/* Size Dropdown and Download Button - Far Right */}
          <div className="flex-shrink-0 flex flex-col items-end gap-2">
            {/* Size Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-3 py-1.5 text-xs font-medium rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1"
              >
                <span>{sizeLabels[fontSize]}</span>
                <svg 
                  className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 bg-white border border-slate-300 rounded shadow-lg z-20 min-w-[100px]">
                    {(['small', 'medium', 'large'] as FontSize[]).map((size) => (
                      <button
                        key={size}
                        onClick={(e) => handleSizeChange(size, e)}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-100 first:rounded-t last:rounded-b ${
                          fontSize === size ? 'bg-slate-100 font-semibold' : ''
                        }`}
                      >
                        {sizeLabels[size]}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="px-4 py-3 text-white font-semibold rounded transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap hover:opacity-90"
              style={{ backgroundColor: '#091c3a' }}
              title="Download font"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>ཕབ་ལེན།</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
