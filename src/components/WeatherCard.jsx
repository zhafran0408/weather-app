import React from "react";

const WeatherCard = ({ data }) => {
  if (!data.name) return null;

  
  const description = data.weather ? data.weather[0].description : "";
  const mainStatus = data.weather ? data.weather[0].main : "";

  return (
    <div className="w-full bg-white/20 backdrop-blur-xl border border-white/30 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-white animate-in fade-in zoom-in duration-500">
      
      
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/30 blur-[60px] rounded-full"></div>

      <div className="flex justify-between items-start relative z-10">
        <div>
          <h2 className="text-3xl font-black tracking-tight flex items-center gap-2">
            {data.name} 
            <span className="text-xs font-bold bg-blue-600 px-2 py-1 rounded-lg uppercase tracking-tighter">
              {data.sys?.country}
            </span>
          </h2>
          <p className="text-sm opacity-70 font-medium italic">Kondisi Saat Ini</p>
        </div>
        <div className="bg-white/20 px-3 py-1 rounded-xl text-[10px] font-black tracking-widest uppercase border border-white/10">
          {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
        </div>
      </div>

      <div className="flex flex-col items-center py-6 relative z-10">
        
        <div className="relative">
          {data.weather && (
            <img 
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} 
              className="w-44 h-44 drop-shadow-2xl" 
              alt="weather-icon" 
            />
          )}
        </div>

        
        <div className="flex items-start">
          <span className="text-[120px] font-black leading-none tracking-tighter drop-shadow-lg">
            {data.main?.temp.toFixed()}
          </span>
          <span className="text-5xl font-bold mt-4 ml-2 text-blue-200 italic">°C</span>
        </div>
        
       
        <div className="mt-4 px-8 py-2 bg-blue-600/40 rounded-full border border-white/20 backdrop-blur-md shadow-lg">
          <p className="text-lg font-black uppercase tracking-[0.2em] text-white text-center">
            {description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8 relative z-10">
        <div className="bg-white/10 p-5 rounded-2rem border border-white/10 text-center group hover:bg-white/20 transition-all">
          <p className="text-[10px] uppercase font-black opacity-50 mb-1 tracking-widest">Kelembapan</p>
          <p className="text-2xl font-black">{data.main?.humidity}%</p>
        </div>
        <div className="bg-white/10 p-5 rounded-2rem border border-white/10 text-center group hover:bg-white/20 transition-all">
          <p className="text-[10px] uppercase font-black opacity-50 mb-1 tracking-widest">Angin</p>
          <p className="text-2xl font-black">{data.wind?.speed} <span className="text-xs opacity-50 font-medium">m/s</span></p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
