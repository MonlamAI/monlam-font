'use client';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  setSelectedCategory 
}: CategoryFilterProps) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="block w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-indigo-200 rounded-lg sm:rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-indigo-200/50 focus:border-indigo-400 transition-all duration-300 text-slate-700 font-medium shadow-lg hover:shadow-xl text-sm sm:text-base"
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
