'use client';

import { useEffect } from 'react';
import { loadFont } from '@/utils/fontLoader';

interface Font {
  id: string;
  name: string;
  tibetanName?: string;
  filename: string;
  category: string;
}

const sampleTexts = [
  'ཨོཾ་མ་ཎི་པདྨེ་ཧཱུྃ',
  'བཀྲ་ཤིས་བདེ་ལེགས',
  'ཏཱ་ལའི་བླ་མ་སྐུ་ཕྲེང་བཅུ་གསུམ་པ',
  'ཨོཾ་ཨཱཿཧཱུྃ་བཛྲ་གུ་རུ་པདྨ་སིདྡྷི་ཧཱུྃ',
  'ཨོཾ་མ་ཎི་པདྨེ་ཧཱུྃ་ཧྲཱིཿ',
  'ཨོཾ་ཨཱཿཧཱུྃ་བཛྲ་གུ་རུ་པདྨ་སིདྡྷི་ཧཱུྃ'
];

// Full Tibetan alphabet with line breaks
const tibetanAlphabet = [
  'ཀ་ཁ་ག་ང་ ཅ་ཆ་ཇ་ཉ་ ཏ་ཐ་ད་ན་',
  'པ་ཕ་བ་མ་ ཙ་ཚ་ཛ་ཝ་ ཞ་ཟ་འ་ཡ་',
  'ར་ལ་ཤ་ས་ ཧ་ཨ།'
];
import { downloadFont } from '@/utils/download';

interface FontPreviewProps {
  font: Font;
  sampleText: string;
  onClose: () => void;
  onTextChange: (text: string) => void;
}

export default function FontPreview({ font, sampleText, onClose, onTextChange }: FontPreviewProps) {
  const fontFamily = `"${font.name}", sans-serif`;

  // Ensure font is loaded when preview opens
  useEffect(() => {
    loadFont(font.name, font.filename).catch(error => {
      console.error(`Failed to load font ${font.name}:`, error);
    });
  }, [font.name, font.filename]);

  const handleDownload = async () => {
    await downloadFont(font.filename, font.name);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white shadow-2xl max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div 
          className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-white"
          style={{ backgroundColor: '#091c3a' }}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm sm:text-base lg:text-lg">
              {font.tibetanName || font.name}
            </span>
            <span className="text-xs sm:text-sm opacity-90 whitespace-nowrap">
              དབྱེ་བ་ {font.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-all duration-300 p-2 hover:bg-white/10 rounded"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Download Button */}
          <div className="mb-6 sm:mb-8 flex justify-end">
            <button
              onClick={handleDownload}
              className="px-4 py-3 text-white font-semibold rounded transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap hover:opacity-90"
              style={{ backgroundColor: '#091c3a' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>ཕབ་ལེན།</span>
            </button>
          </div>

          {/* Custom Text Preview */}
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6">
              Custom Text Preview
            </h3>
            <div>
              {/* Editable Text Input */}
              <textarea
                value={sampleText}
                onChange={(e) => onTextChange(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-all duration-200 text-lg sm:text-xl resize-none"
                rows={3}
                placeholder="Enter Tibetan text to preview..."
                style={{ fontFamily }}
              />
            </div>
          </div>

          {/* Tibetan Alphabet */}
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6">
              Tibetan Alphabet
            </h3>
            <div className="p-4 sm:p-6 bg-slate-50 rounded-lg border border-slate-200">
              <div
                className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-slate-800 font-medium"
                style={{ fontFamily }}
              >
                {tibetanAlphabet.map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < tibetanAlphabet.length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sample Texts */}
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6">
              Sample Texts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {sampleTexts.map((text, index) => (
                <div key={index} className="p-4 sm:p-6 bg-slate-50 rounded-lg border border-slate-200">
                  <div
                    className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-slate-800 font-medium"
                    style={{ fontFamily }}
                  >
                    {text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Font Information */}
          <div className="bg-slate-50 rounded-lg p-4 sm:p-6 lg:p-8 border border-slate-200">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6">
              Font Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-slate-200">
                <span className="font-semibold text-slate-700 text-sm sm:text-base">Name:</span>
                <span className="ml-2 text-slate-700 font-medium text-sm sm:text-base">{font.name}</span>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-slate-200">
                <span className="font-semibold text-slate-700 text-sm sm:text-base">Filename:</span>
                <span className="ml-2 text-slate-700 font-mono text-xs sm:text-sm break-all">{font.filename}</span>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-slate-200">
                <span className="font-semibold text-slate-700 text-sm sm:text-base">Font Family:</span>
                <span className="ml-2 text-slate-700 font-mono text-xs sm:text-sm break-all">{fontFamily}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
