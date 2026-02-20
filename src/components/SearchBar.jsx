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