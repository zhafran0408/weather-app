import React from "react";
import { Search as SearchIcon } from "lucide-react";

const Search = ({ lokasi, setLokasi, onSearch, isNight }) => {
  return (
    <div className={`group flex items-center gap-4 p-5 rounded-[2rem] border transition-all duration-300 shadow-sm ${
      isNight 
        ? "bg-white/5 border-white/10 focus-within:border-indigo-500/50 focus-within:bg-white/10" 
        : "bg-slate-50 border-slate-200 focus-within:border-blue-400 focus-within:bg-white focus-within:shadow-xl"
    }`}>
      <SearchIcon size={20} className="opacity-30 group-focus-within:opacity-100 transition-opacity" />
      <input 
        value={lokasi} 
        onChange={(e) => setLokasi(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        placeholder="CARI KOTA..." 
        className={`bg-transparent flex-1 outline-none font-black text-xs tracking-[0.2em] uppercase placeholder:opacity-20 ${
          isNight ? 'text-white' : 'text-slate-800'
        }`}
      />
    </div>
  );
};

export default Search;