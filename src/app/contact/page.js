"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  MapPin, 
  MessageSquare, 
  Globe, 
  Send,
  Plus,
  Minus,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const ContactInfo = [
  {
    icon: <MessageSquare className="text-emerald-700" size={28} />,
    title: "WhatsApp & Mobile",
    detail: "+94 77 747 2445",
    subtext: "Instant support available 24/7",
    color: "bg-emerald-50"
  },
  {
    icon: <Mail className="text-gold" size={28} />,
    title: "Email Address",
    detail: "info@amayotours.com",
    subtext: "Get a custom quote via email",
    color: "bg-orange-50"
  },
  {
    icon: <Globe className="text-blue-700" size={28} />,
    title: "We Speak",
    detail: "English, Sinhalese, Tamil",
    subtext: "Native communication",
    color: "bg-blue-50"
  }
];

const faqs = [
  {
    question: "How do I book a custom manual tour?",
    answer: "Simply fill out the inquiry form below or message us on WhatsApp. We will discuss your preferred destinations and provide a custom itinerary within 48 hours."
  },
  {
    question: "Is airport pickup included in all packages?",
    answer: "Yes, all our standard and exclusive packages include professional airport pickup and drop-off to ensure a seamless arrival in Sri Lanka."
  },
  {
    question: "Can I change the itinerary after booking?",
    answer: "We are flexible! While major changes might affect pricing, we strive to accommodate small adjustments to your route even during the tour."
  }
];

export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <main className="bg-[#f8f9fa] min-h-screen font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-48 pb-40 bg-[#021f14] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/contactus.jpg" 
            alt="Sri Lanka Scene" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#021f14]/80 via-transparent to-[#f8f9fa]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-[11px] font-bold tracking-[0.3em] uppercase mb-6 backdrop-blur-sm">
              Contact Us
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white font-['Playfair_Display'] leading-tight">
              Start Your <span className="italic text-gold">Journey</span>
            </h1>
            <p className="text-white/70 mt-6 text-lg max-w-xl mx-auto">
              Have questions about your Sri Lankan adventure? Our local experts are here to help you 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="max-w-7xl mx-auto px-6 -mt-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ContactInfo.map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={idx}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-black/5 border border-white hover:border-gold/50 transition-all group flex flex-col items-center text-center"
            >
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">{item.title}</h3>
              <p className="text-xl font-bold text-[#021f14] mb-1">{item.detail}</p>
              <p className="text-sm text-gray-500">{item.subtext}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#021f14] font-['Playfair_Display'] mb-4">Plan Your Custom Tour</h2>
            <p className="text-gray-500">Fill out the form below and receive a personalized itinerary within 24 hours.</p>
          </div>

          <form className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-gray-100 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 ml-1">Your Name</label>
                <input type="text" placeholder="e.g. David Miller" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-gold focus:bg-white transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 ml-1">Email Address</label>
                <input type="email" placeholder="david@example.com" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-gold focus:bg-white transition-all" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 ml-1">Subject</label>
              <select className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-gold focus:bg-white transition-all appearance-none">
                <option>General Inquiry</option>
                <option>Custom 7-Day Tour</option>
                <option>14-Day Exclusive Package</option>
                <option>Honeymoon Special</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 ml-1">Message</label>
              <textarea placeholder="Tell us about your group size and preferred dates..." className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-gold focus:bg-white h-40 resize-none transition-all"></textarea>
            </div>
            
            <button type="button" className="w-full py-5 bg-[#021f14] text-white rounded-xl font-bold text-sm tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-900/20">
              SEND MESSAGE <Send size={18} className="text-gold" />
            </button>
          </form>
        </div>

        {/* Q&A and Location */}
        <div className="lg:col-span-5 space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-[#021f14] font-['Playfair_Display'] mb-8">Quick Help</h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className={`rounded-2xl transition-all border ${activeFaq === idx ? "bg-emerald-50 border-emerald-100" : "bg-white border-gray-100"}`}>
                  <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex justify-between items-center text-left p-5 transition-colors"
                  >
                    <span className={`font-bold text-sm ${activeFaq === idx ? "text-emerald-900" : "text-[#021f14]"}`}>{faq.question}</span>
                    {activeFaq === idx ? <Minus size={18} className="text-emerald-600" /> : <Plus size={18} className="text-gray-300" />}
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#021f14] p-8 rounded-[32px] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
              <MapPin size={120} />
            </div>
            <div className="relative z-10">
              <h4 className="text-gold font-bold text-lg mb-2">Our Local Office</h4>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">
                Visit us for a tea and a chat about your plans.<br />
                Negombo / Kandy, Sri Lanka.
              </p>
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full text-xs font-bold tracking-widest transition-all">
                VIEW ON GOOGLE MAPS <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
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
            <h4 className="text-gold text-[10px] font-black uppercase tracking-[0.3em]">Newsletter</h4>
            <p className="text-white/50 text-xs leading-relaxed">
              Subscribe to receive curated itineraries and exclusive travel offers.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-5 pr-12 text-sm focus:border-gold outline-none transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gold rounded-lg flex items-center justify-center text-[#021f14] hover:bg-white transition-colors">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-white/30 tracking-[0.2em] uppercase text-center md:text-left">
            © {currentYear} AMAYO TOURS SRI LANKA. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2 group">
            <span className="text-[10px] font-bold text-white/30 tracking-[0.2em] uppercase">Built by</span>
            <span className="text-gold text-[10px] font-black tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-500">
                Amasha
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}