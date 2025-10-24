'use client';

interface Font {
  id: string;
  name: string;
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
import { downloadFont } from '@/utils/download';

interface FontPreviewProps {
  font: Font;
  sampleText: string;
  onClose: () => void;
}

export default function FontPreview({ font, sampleText, onClose }: FontPreviewProps) {
  const fontFamily = `"${font.name}", sans-serif`;

  const handleDownload = async () => {
    await downloadFont(font.filename, font.name);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-indigo-200/50">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 lg:p-8 border-b border-indigo-200/50 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-2xl sm:rounded-t-3xl">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{font.name}</h2>
            <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                font.category === 'Monlam Classic' ? 'bg-purple-100 text-purple-700' :
                font.category === 'Monlam Unicode' ? 'bg-blue-100 text-blue-700' :
                'bg-slate-100 text-slate-700'
              }`}>
                {font.category}
              </span>
              <span className="mx-2">•</span>
              <span className="text-slate-500 font-mono">{font.filename}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg sm:rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden sm:inline">Download Font</span>
              <span className="sm:hidden">Download</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-all duration-300 p-2 sm:p-3 hover:bg-slate-100 rounded-lg sm:rounded-xl"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Custom Text Preview */}
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center gap-2">
              ✍️ Custom Text Preview
            </h3>
            <div
              className="text-2xl sm:text-3xl lg:text-4xl leading-relaxed text-slate-800 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl border border-indigo-200/50 shadow-inner"
              style={{ fontFamily }}
            >
              {sampleText}
            </div>
          </div>

          {/* Sample Texts */}
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center gap-2">
              📝 Sample Texts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {sampleTexts.map((text, index) => (
                <div key={index} className="p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-lg sm:rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
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
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-indigo-200/50 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center gap-2">
              ℹ️ Font Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-indigo-200/30">
                <span className="font-semibold text-indigo-700 text-sm sm:text-base">Name:</span>
                <span className="ml-2 text-slate-700 font-medium text-sm sm:text-base">{font.name}</span>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-indigo-200/30">
                <span className="font-semibold text-indigo-700 text-sm sm:text-base">Category:</span>
                <span className="ml-2 text-slate-700 font-medium text-sm sm:text-base">{font.category}</span>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-indigo-200/30">
                <span className="font-semibold text-indigo-700 text-sm sm:text-base">Filename:</span>
                <span className="ml-2 text-slate-700 font-mono text-xs sm:text-sm break-all">{font.filename}</span>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-indigo-200/30">
                <span className="font-semibold text-indigo-700 text-sm sm:text-base">Font Family:</span>
                <span className="ml-2 text-slate-700 font-mono text-xs sm:text-sm break-all">{fontFamily}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
