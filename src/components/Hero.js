"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video 
        autoPlay loop muted playsInline 
        className="absolute w-full h-full object-cover"
      >
        <source src="/videos/hero-sri-lanka.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay to make text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-jungle/70 via-jungle/40 to-ocean/80" />
      
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-4xl md:text-7xl font-bold text-sand mb-4 leading-tight">
          Explore Sri Lanka with <br/>
          <span className="text-gold uppercase tracking-tighter">AMAYO TOURS</span>
        </h1>
        <p className="text-lg md:text-xl text-tea mb-10 max-w-2xl mx-auto font-light">
          Your journey through the heart of paradise begins here. 
          Luxury transport and local expertise based in Kandy.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a 
            href="/packages" 
            className="bg-gold text-jungle px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:scale-105 transition-all"
          >
            Explore Packages
          </a>
          <a 
            href="https://wa.me/0777472445" 
            className="glass text-sand px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
          >
            WhatsApp Us
          </a>
        </div>
      </motion.div>
    </section>
  );
}