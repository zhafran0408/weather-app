import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherCard = ({ data }) => {
  if (!data || !data.name) return null;

  const formatJam = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="w-full bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-500 text-white">
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <h2 className="text-2xl font-black tracking-widest uppercase text-blue-200">
            {data.name}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 mb-10">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/30 blur-3xl rounded-full"></div>
            <img 
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} 
              className="w-48 h-48 relative drop-shadow-[0_20px_50px_rgba(59,130,246,0.5)]" 
              alt="cuaca" 
            />
          </div>
          
          <div className="text-center md:text-left">
            <div className="flex items-start justify-center md:justify-start">
              <span className="text-[120px] font-black leading-none tracking-tighter bg-gradient-to-b from-white to-blue-200 bg-clip-text text-transparent">
                {data.main.temp.toFixed()}
              </span>
              <span className="text-4xl font-black text-cyan-400 mt-4">°</span>
            </div>
            <p className="text-2xl font-bold text-blue-200 capitalize tracking-tight -mt-4">
              {data.weather[0].description}
            </p>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-blue-900/20 rounded-[2rem] border border-white/5">
          {[
            { label: "Kelembapan", value: `${data.main.humidity}%` },
            { label: "Kec. Angin", value: `${data.wind.speed} m/s` },
            { label: "Terbit", value: formatJam(data.sys.sunrise) },
            { label: "Terbenam", value: formatJam(data.sys.sunset) }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-[10px] font-black uppercase text-cyan-400 tracking-widest mb-1">{item.label}</p>
              <p className="text-lg font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [data, setData] = useState(null);
  const [lokasi, setLokasi] = useState("");
  const [riwayat, setRiwayat] = useState([]); 
  const API_KEY = import.meta.env.VITE_WEATHER_KEY;

  useEffect(() => {
    ambilCuaca("Jakarta"); 
    const simpananRiwayat = JSON.parse(localStorage.getItem("riwayatKota")) || [];
    setRiwayat(simpananRiwayat);
  }, []);

  const ambilCuaca = async (namaKota) => {
    if (!namaKota) return;
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${namaKota}&units=metric&appid=${API_KEY}&lang=id`);
      setData(res.data);
      setRiwayat(prev => {
        const baru = [namaKota, ...prev.filter(c => c.toLowerCase() !== namaKota.toLowerCase())].slice(0, 5);
        localStorage.setItem("riwayatKota", JSON.stringify(baru));
        return baru;
      });
    } catch (err) {
      if (lokasi) alert("Kota tidak ditemukan");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a192f] flex flex-col font-sans text-white">
      <nav className="bg-[#0a192f]/50 backdrop-blur-md border-b border-white/10 px-8 py-5 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-xl">☁️</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter uppercase">Weather <span className="text-cyan-400">App</span></h1>
          </div>
          <div className="w-full max-w-md relative">
            <input
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (ambilCuaca(lokasi), setLokasi(""))}
              placeholder="Cari Kota Sekarang..."
              className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-3 px-6 text-sm font-bold text-white outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 transition-all shadow-inner placeholder:text-white/20"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-10 p-8">
        <aside className="md:col-span-3 order-2 md:order-1">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-400 mb-6 px-2">Riwayat Pencarian</h3>
          <div className="flex flex-col gap-3">
            {riwayat.map((c, i) => (
              <button key={i} onClick={() => ambilCuaca(c)} className="text-left px-6 py-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-400/50 font-bold text-blue-100 hover:text-white transition-all capitalize shadow-sm active:scale-95">
                {c}
              </button>
            ))}
          </div>
        </aside>
        <section className="md:col-span-9 order-1 md:order-2">
          {data ? <WeatherCard data={data} /> : (
            <div className="h-96 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </section>
      </main>

      <footer className="py-10 text-center border-t border-white/5">
        <p className="text-[10px] font-black tracking-[0.5em] uppercase text-white/20">☁️ Weather App • 2026</p>
      </footer>
    </div>
  );
}

export default App;



