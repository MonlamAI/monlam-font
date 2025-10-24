'use client';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search fonts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border-2 border-indigo-200 rounded-lg sm:rounded-xl leading-5 bg-white/80 backdrop-blur-sm placeholder-indigo-400 focus:outline-none focus:placeholder-indigo-300 focus:ring-4 focus:ring-indigo-200/50 focus:border-indigo-400 transition-all duration-300 text-slate-700 font-medium shadow-lg hover:shadow-xl text-sm sm:text-base"
      />
    </div>
  );
}
