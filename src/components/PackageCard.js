import { Clock, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

export default function PackageCard({ title, duration, price, highlights, image }) {
  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col h-full transition-all duration-500 hover:border-gold/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      
      {/* Tour Image with Overlay */}
      <div className="h-64 w-full relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        {/* Subtle Gradient Overlay to ensure top-right tag visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-60" />
        
        <div className="absolute top-5 right-5 bg-gold text-[#041a12] px-5 py-2 rounded-2xl font-black shadow-xl tracking-tighter text-sm">
          {price}
        </div>
        
        {/* Category Badge or Floating Detail */}
        <div className="absolute bottom-5 left-5 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full">
           <span className="flex items-center gap-1.5 text-white text-[10px] font-black uppercase tracking-widest">
            <MapPin size={12} className="text-gold"/> Sri Lanka
           </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex flex-col flex-grow bg-gradient-to-b from-white/[0.02] to-transparent">
        
        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center gap-1.5 text-gold font-bold text-[10px] uppercase tracking-[0.2em]">
            <Clock size={14}/> {duration}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 font-['Playfair_Display'] leading-tight group-hover:text-gold transition-colors">
          {title}
        </h3>
        
        {/* Decorative Divider */}
        <div className="w-12 h-[2px] bg-gold/30 mb-6 group-hover:w-20 transition-all duration-500" />

        <ul className="space-y-3 mb-8 flex-grow">
          {highlights.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-white/60 font-light leading-relaxed">
              <CheckCircle size={16} className="text-gold shrink-0 mt-0.5 opacity-80" />
              {item}
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <a 
          href={`https://wa.me/94777472445?text=I'm interested in booking the ${title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn relative w-full overflow-hidden py-4 bg-white text-[#041a12] text-center rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-gold active:scale-95"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Reserve Now <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </span>
        </a>
      </div>
    </div>
  );
}