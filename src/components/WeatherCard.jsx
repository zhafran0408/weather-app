import React from "react";

const WeatherCard = ({ label, val, Icon, color, isNight }) => {
  return (
    <div className={`group relative p-6 rounded-[2.8rem] border transition-all duration-500 hover:scale-[1.02] active:scale-95 ${
      isNight 
        ? "bg-white/5 border-white/10 hover:bg-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]" 
        : "bg-white shadow-[0_15px_35px_rgba(0,0,0,0.03)] border-slate-100 hover:shadow-xl hover:border-slate-200"
    }`}>
      {/* Icon Wrapper dengan Glow halus */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-12 ${
        isNight ? 'bg-white/10' : 'bg-slate-50 shadow-inner'
      }`}>
        <Icon size={24} className={`${color} drop-shadow-md`} />
      </div>

      {/* Konten Teks */}
      <div className="space-y-1.5">
        <p className={`text-[10px] font-black uppercase tracking-[0.25em] transition-opacity duration-300 ${
          isNight ? 'text-white/40 group-hover:text-white/60' : 'text-slate-400 group-hover:text-slate-600'
        }`}>
          {label}
        </p>
        <p className={`text-2xl md:text-3xl font-[1000] italic tracking-tighter transition-colors duration-300 ${
          isNight ? 'text-white' : 'text-slate-900'
        }`}>
          {val}
        </p>
      </div>

      {/* Dekorasi kecil biar gak sepi */}
      <div className={`absolute top-4 right-6 w-1.5 h-1.5 rounded-full opacity-20 ${
        isNight ? 'bg-white' : 'bg-slate-900'
      }`}></div>
    </div>
  );
};

export default WeatherCard;
