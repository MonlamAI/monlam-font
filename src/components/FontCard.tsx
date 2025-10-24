'use client';

interface Font {
  id: string;
  name: string;
  filename: string;
  category: string;
}
import { downloadFont } from '@/utils/download';

interface FontCardProps {
  font: Font;
  sampleText: string;
  onClick: () => void;
  isSelected: boolean;
}

export default function FontCard({ font, sampleText, onClick, isSelected }: FontCardProps) {
  const fontFamily = `"${font.name}", sans-serif`;

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    await downloadFont(font.filename, font.name);
  };

  return (
    <div
      className={`bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
        isSelected 
          ? 'ring-4 ring-indigo-300 border-indigo-400 shadow-indigo-200/50' 
          : 'border-slate-200 hover:border-indigo-300'
      }`}
      onClick={onClick}
    >
      <div className="p-4 sm:p-6">
        <div className="mb-3 sm:mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-800 text-sm sm:text-base truncate pr-2">{font.name}</h3>
            <button
              onClick={handleDownload}
              className="text-slate-400 hover:text-indigo-600 transition-all duration-300 p-1 sm:p-2 hover:bg-indigo-50 rounded-lg hover:scale-110 flex-shrink-0"
              title="Download font"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          </div>
          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
            font.category === 'Monlam Classic' ? 'bg-purple-100 text-purple-700' :
            font.category === 'Monlam Unicode' ? 'bg-blue-100 text-blue-700' :
            'bg-slate-100 text-slate-700'
          }`}>
            {font.category}
          </span>
        </div>
        
        <div className="mb-3 sm:mb-4">
          <div
            className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-slate-800 font-medium"
            style={{ fontFamily }}
          >
            {sampleText}
          </div>
        </div>
        
        <div className="text-xs text-slate-500 font-mono bg-slate-50 px-2 py-1 rounded truncate">
          {font.filename}
        </div>
      </div>
    </div>
  );
}
