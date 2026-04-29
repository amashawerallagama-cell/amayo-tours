import { Star, ArrowRight } from 'lucide-react';

export default function PackageCard({ title, duration, category, image, rating, highlights, onExplore }) {
  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-[30px] overflow-hidden hover:border-gold/50 transition-all duration-500">
      <div className="h-64 overflow-hidden relative">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <span className="text-gold text-[10px] font-black uppercase tracking-widest">{category}</span>
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white font-['Playfair_Display'] leading-tight">{title}</h3>
          <div className="flex items-center gap-1 text-gold">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold">{rating}</span>
          </div>
        </div>

        <ul className="space-y-2 mb-8">
          {highlights.slice(0, 3).map((item, i) => (
            <li key={i} className="text-white/50 text-xs flex items-center gap-2">
              <div className="w-1 h-1 bg-gold rounded-full" /> {item}
            </li>
          ))}
        </ul>

        <button 
          onClick={onExplore}
          className="w-full py-4 bg-white text-[#021f14] rounded-xl font-black text-[11px] tracking-[0.2em] uppercase hover:bg-gold transition-all flex items-center justify-center gap-2"
        >
          Explore Journey <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}