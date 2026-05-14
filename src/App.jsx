import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  MapPin, Droplets, Wind, Sunrise, Sunset, 
  Sun, Moon, Calendar, Cloud, CloudRain, CloudLightning, CloudSun,
  Zap // Kita pakai Zap sebagai simbol 'Pulse' yang kecil
} from "lucide-react";

// Import komponen hasil pisahan
import Search from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  const [data, setData] = useState(null);
  const [lokasi, setLokasi] = useState("");
  const [isNight, setIsNight] = useState(false);

  const ambilCuaca = async (name) => {
    if (!name) return;
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${import.meta.env.VITE_WEATHER_KEY}&lang=id`
      );
      setData(res.data);
      setLokasi(""); 
    } catch (err) {
      console.error("Gagal mengambil data.");
    }
  };

  useEffect(() => {
    ambilCuaca("Yogyakarta");
  }, []);

  const formatNamaKota = (name) => {
    if (!name) return "Memuat...";
    if (name === "Daerah Istimewa Yogyakarta") return "DIY Yogyakarta";
    return name.length > 20 ? name.substring(0, 17) + "..." : name;
  };

  const renderIcon = () => {
    if (!data) return <Cloud size={80} className="text-white opacity-20 animate-pulse" />;
    const kondisi = data.weather[0].main;
    const props = { size: 120, className: "text-white drop-shadow-2xl animate-bounce-slow" };
    
    if (kondisi === "Clear") return <Sun {...props} className="text-yellow-300" />;
    if (kondisi === "Rain") return <CloudRain {...props} className="text-blue-100" />;
    if (kondisi === "Thunderstorm") return <CloudLightning {...props} className="text-purple-300" />;
    return <Cloud {...props} className="text-slate-100" />;
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-start md:justify-center font-sans transition-all duration-1000 ${
      isNight ? "bg-[#020617]" : "bg-[#f8fafc]"
    }`}>
      
      {/* MAIN CONTAINER */}
      <div className={`relative w-full min-h-screen md:min-h-[850px] md:h-auto md:max-w-4xl flex flex-col md:flex-row md:rounded-[3.5rem] shadow-2xl overflow-visible md:overflow-hidden ${
        isNight ? "bg-slate-900" : "bg-white"
      }`}>
        
        {/* TOP SECTION (HERO) */}
        <div className={`relative flex-[1.4] p-8 md:p-14 flex flex-col items-center justify-between text-white transition-all duration-1000 min-h-[65vh] md:min-h-0 ${
          isNight ? "bg-gradient-to-br from-indigo-600 via-indigo-900 to-slate-950" : "bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-700"
        }`}>
          
          {/* Logo SkyPulse & Mode Toggle */}
          <div className="w-full flex justify-between items-center z-10">
            <div className="flex items-center gap-2 group">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/20">
                <Cloud size={20} className="text-white fill-white/20" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black tracking-[0.3em] leading-none uppercase">SkyPulse</span>
                <span className="text-[7px] font-bold tracking-[0.1em] opacity-50 uppercase">Weather App</span>
              </div>
            </div>
            <button 
              onClick={() => setIsNight(!isNight)} 
              className="p-3 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 active:scale-90 transition-all hover:bg-white/30"
            >
              {isNight ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Suhu Utama & Icon */}
          <div className="flex flex-col items-center z-10 text-center transform md:scale-110">
            <div className="relative mb-6">
               <div className="absolute inset-0 bg-white/30 blur-[80px] rounded-full scale-150 animate-pulse"></div>
               {renderIcon()}
            </div>
            <div className="relative">
              <h2 className="text-[9rem] md:text-[11rem] font-black tracking-tighter italic leading-[0.8] mb-4">
                {data ? Math.round(data.main.temp) : "--"}<span className="text-5xl align-top inline-block mt-8">°</span>
              </h2>
              <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 shadow-lg">
                <MapPin size={12} className="text-white/70" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                  {formatNamaKota(data?.name)}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Info Bar */}
          <div className="w-full flex justify-between items-end z-10 border-t border-white/10 pt-8 mt-4">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black uppercase opacity-50 tracking-widest">Update Terakhir</span>
              <span className="text-lg font-black tracking-tighter italic uppercase">
                {new Date().toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
              </span>
            </div>
            <Calendar size={20} className="opacity-60" />
          </div>
        </div>

        {/* BOTTOM SECTION (DATA) */}
        <div className="flex-1 p-8 md:p-14 flex flex-col gap-10 bg-transparent relative z-20">
          
          <Search 
            lokasi={lokasi} 
            setLokasi={setLokasi} 
            onSearch={() => ambilCuaca(lokasi)} 
            isNight={isNight} 
          />

          <div className="grid grid-cols-2 gap-5 md:gap-6">
            <WeatherCard label="HUMIDITY" val={`${data?.main.humidity || 0}%`} Icon={Droplets} color="text-blue-500" isNight={isNight} />
            <WeatherCard label="WIND SPEED" val={`${data?.wind.speed || 0} m/s`} Icon={Wind} color="text-emerald-500" isNight={isNight} />
            <WeatherCard 
              label="SUNRISE" 
              val={data ? new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : "--:--"} 
              Icon={Sunrise} color="text-orange-500" isNight={isNight} 
            />
            <WeatherCard 
              label="SUNSET" 
              val={data ? new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : "--:--"} 
              Icon={Sunset} color="text-indigo-500" isNight={isNight} 
            />
          </div>

          {/* FOOTER - Rapi & Minimalis */}
          <div className="mt-auto pt-10 border-t border-slate-500/10 flex flex-col items-center gap-4">
             <div className="flex gap-4 overflow-x-auto no-scrollbar w-full pb-2">
                {["Jakarta", "Bali", "Tokyo", "London"].map(city => (
                  <button 
                    key={city} 
                    onClick={() => ambilCuaca(city)} 
                    className={`px-6 py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all active:scale-95 ${
                      isNight ? "bg-white/5 border border-white/10 text-white" : "bg-white shadow-sm border border-slate-200 text-slate-900"
                    }`}
                  >
                    {city}
                  </button>
                ))}
             </div>
             
             {/* Credit Footer */}
             <div className={`flex items-center gap-2 opacity-30 text-[9px] font-black uppercase tracking-[0.3em] ${isNight ? 'text-white' : 'text-slate-900'}`}>
                <span>© 2026 SkyPulse</span>
                <div className="w-1 h-1 rounded-full bg-current"></div>
                <span>Premium Experience</span>
             </div>
          </div>
          
          <div className="h-4 md:hidden"></div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
      `}</style>

    </div>
  );
}


