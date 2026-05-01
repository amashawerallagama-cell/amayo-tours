"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  History,
  ShieldCheck,
  Map,
  MapPin, 
  CheckCircle2, 
  Compass,
  Zap,
  Wallet,
  Send,
  Heart
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const stats = [
  { label: 'Years of Experience', value: '15+', icon: <History className="text-gold" /> },
  { label: 'Happy Travelers', value: '2,000+', icon: <Users className="text-gold" /> },
  { label: 'Community Members', value: '1,000+', icon: <Heart className="text-gold" /> },
  { label: 'Safety Rating', value: '100%', icon: <ShieldCheck className="text-gold" /> },
];

const values = [
  {
    title: "Deep Local Expertise",
    description: "Founded by the creator of Kandy’s DropInn Hostel, our roots are deeply embedded in authentic Sri Lankan hospitality.",
    icon: <MapPin className="text-emerald-700" size={24} />
  },
  {
    title: "Unbeatable Value",
    description: "We believe luxury is in the experience, not the price tag. We offer high-quality tours at budget-friendly rates.",
    icon: <Wallet className="text-emerald-700" size={24} />
  },
  {
    title: "Authentic Discovery",
    description: "We take you behind the scenes to meet the people and traditions of our island, far beyond the typical tourist paths.",
    icon: <Compass className="text-emerald-700" size={24} />
  }
];

export default function AboutPage() {
  return (
    <main className="bg-[#fcfcf9] min-h-screen">
      <Navbar />

      {/* Hero Section with Slow Zoom-Out */}
      <section className="relative pt-44 pb-32 bg-[#021f14] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 3, ease: "easeOut" }}
            src="/images/aboutus.jpg" 
            alt="Sri Lanka Culture" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fcfcf9]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-gold font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">
              Our Journey
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white font-['Playfair_Display'] leading-tight">
              Rooted in Kandy. <br />
              <span className="italic text-gold">Built for You.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Legacy & Core Identity Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src="/images/85031314.jpg" 
                alt="Founder of Amayo Tours and DropInn Hostel" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-gold p-8 rounded-[30px] hidden md:block border-[8px] border-[#fcfcf9]">
              <p className="text-black font-black text-2xl">15+</p>
              <p className="text-black/60 text-[10px] font-bold uppercase tracking-widest leading-none">Years Expertise</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 text-emerald-800 text-[10px] font-black tracking-widest uppercase">
              <Zap size={14} className="text-gold fill-gold" /> Our Unique Edge
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#021f14] font-['Playfair_Display']">
              The expertise of a luxury agency. The heart of a local hostel.
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg italic">
              "Travel should be accessible, authentic, and unforgettable. That was the mission when we started DropInn Hostel in Kandy, and it remains our mission today."
            </p>
            <p className="text-gray-600 leading-relaxed">
              Founded by the owner of the renowned <strong>DropInn Hostel Kandy</strong>, Amayo Tours is the result of over 15 years in the tourism industry. We’ve welcomed thousands of global backpackers and luxury travelers alike, giving us a unique perspective on how to provide a premium experience without the premium price tag.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "15 Years Industry Mastery",
                "Kandy's Local Pioneers",
                "Budget-First Philosophy",
                "No Hidden Middleman Fees"
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <CheckCircle2 className="text-gold" size={20} />
                  <span className="text-[#021f14] font-bold text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      <section className="bg-[#021f14] py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
              <motion.div 
                whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
                key={i} 
                className="space-y-3"
              >
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <h4 className="text-4xl font-bold text-white font-['Playfair_Display']">{stat.value}</h4>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Are Different */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-[#021f14] font-['Playfair_Display'] mb-4">Why Travel With Us?</h2>
          <p className="text-gray-500 max-w-xl mx-auto">We don't just sell tours; we share the island we love at a price that makes sense.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <div key={i} className="p-10 bg-white border border-gray-100 rounded-[40px] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gold transition-colors">
                {React.cloneElement(value.icon, { className: "group-hover:text-black transition-colors" })}
              </div>
              <h3 className="text-xl font-bold text-[#021f14] mb-4">{value.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="bg-[#021f14] rounded-[60px] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src="/images/pattern.png" alt="Pattern" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white font-['Playfair_Display'] mb-8">
              Experience the Island <br /> <span className="text-gold italic">Like a Local.</span>
            </h2>
            <button className="bg-gold text-black px-12 py-6 rounded-full font-black text-xs tracking-widest hover:bg-white transition-all transform hover:scale-105">
              BOOK YOUR ESCAPE
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#01140d] text-white pt-20 pb-10 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-['Playfair_Display'] tracking-tight">
              AMAYO<span className="text-gold italic">TOURS</span>
            </h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Crafting bespoke journeys through the heart of Sri Lanka. From misty highlands to golden shores, we are your local gateway to paradise.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-gold text-[10px] font-black uppercase tracking-[0.3em]">Navigate</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="/" className="hover:text-gold transition-colors">Home</a></li>
              <li><a href="/packages" className="hover:text-gold transition-colors">Tour Packages</a></li>
              <li><a href="/#map" className="hover:text-gold transition-colors">Waypoints</a></li>
              <li><a href="/contact" className="hover:text-gold transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-gold text-[10px] font-black uppercase tracking-[0.3em]">Services</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-gold transition-colors">Private Transfers</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Guided Tours</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Hotel Bookings</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Custom Itineraries</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-gold text-[10px] font-black uppercase tracking-[0.3em]">Our Digital Presence</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-white/50 hover:text-gold transition-colors text-[10px] font-bold uppercase tracking-widest">Amayo Clothing</a>
              <a href="#" className="text-white/50 hover:text-gold transition-colors text-[10px] font-bold uppercase tracking-widest">Elegant Lady</a>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-white/30 tracking-[0.2em] uppercase text-center md:text-left">
            © {currentYear} AMAYO TOURS SRI LANKA. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-col items-center md:items-end gap-1 group">
            <span className="text-[10px] font-bold text-white/30 tracking-[0.2em] uppercase">Designed & Developed by</span>
            <span className="text-gold text-[10px] font-black tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-500">
              Amasha | Business Systems Developer
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}