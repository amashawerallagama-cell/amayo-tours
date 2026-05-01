"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  Mail, 
  MapPin, 
  MessageSquare, 
  Globe, 
  Send,
  Plus,
  Minus,
  ExternalLink,
  Loader2,
  Sparkles
} from 'lucide-react';
import Navbar from '@/components/Navbar';

// --- DATA CONSTANTS (Kept same as your logic) ---
const ContactInfo = [
  {
    icon: <MessageSquare className="text-emerald-700" size={28} />,
    title: "WhatsApp & Mobile",
    detail: "+94 77 747 2445",
    subtext: "Instant support available 24/7",
    color: "bg-emerald-50",
    link: "https://wa.me/94777472445"
  },
  {
    icon: <Mail className="text-amber-600" size={28} />,
    title: "Email Address",
    detail: "info@amayotours.com",
    subtext: "Get a custom quote via email",
    color: "bg-orange-50",
    link: "mailto:info@amayotours.com"
  },
  {
    icon: <Globe className="text-blue-700" size={28} />,
    title: "We Speak",
    detail: "English, Sinhalese",
    subtext: "Native communication",
    color: "bg-blue-50",
    link: null
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
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(""); 

  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const sendEmail = (e) => {
    e.preventDefault();
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("ERROR");
      return;
    }
    setIsSending(true);
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatus("SUCCESS");
        setIsSending(false);
        formRef.current.reset();
        setTimeout(() => setStatus(""), 5000);
      }, (error) => {
        console.error("FAILED...", error);
        setStatus("ERROR");
        setIsSending(false);
      });
  };

  return (
    <main className="bg-[#fcfdfd] min-h-screen font-sans selection:bg-gold/30">
      <Navbar />

      {/* --- ENHANCED HERO SECTION --- */}
      <section className="relative pt-52 pb-48 bg-[#021f14] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            src="/images/contactus.jpg" 
            alt="Sri Lanka Scene" 
            className="w-full h-full object-cover opacity-30"
          />
          {/* Subtle overlay gradients for depth */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#021f14] via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fcfdfd]/10 to-[#fcfdfd]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex justify-center items-center gap-2 mb-6">
                <div className="h-[1px] w-8 bg-gold/50" />
                <span className="px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-black tracking-[0.4em] uppercase backdrop-blur-md">
                Get In Touch
                </span>
                <div className="h-[1px] w-8 bg-gold/50" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white font-['Playfair_Display'] leading-tight tracking-tight">
              Let's Plan Your <br />
              <span className="italic text-gold relative">
                Escape
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-gold/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
            </h1>
            <p className="text-white/60 mt-8 text-xl max-w-2xl mx-auto font-light leading-relaxed">
              From the misty tea trails of Ella to the golden reefs of Kalpitiya—your bespoke Sri Lankan adventure starts with a single conversation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- ENHANCED CONTACT CARDS --- */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ContactInfo.map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={idx}
              className="bg-white/80 backdrop-blur-xl p-10 rounded-[40px] shadow-2xl shadow-emerald-900/5 border border-white hover:shadow-gold/10 hover:-translate-y-2 transition-all duration-500 group text-center"
            >
              <div className={`w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:rotate-6 transition-transform duration-500`}>
                {item.icon}
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">{item.title}</h3>
              {item.link ? (
                <a href={item.link} className="text-2xl font-bold text-[#021f14] mb-2 hover:text-gold transition-colors block">{item.detail}</a>
              ) : (
                <p className="text-2xl font-bold text-[#021f14] mb-2">{item.detail}</p>
              )}
              <p className="text-sm text-gray-500 font-medium italic">{item.subtext}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- MAIN CONTENT: GLASSMORPHIC FORM --- */}
      <section className="relative max-w-7xl mx-auto px-6 py-32 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-40 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-emerald-700/5 rounded-full blur-3xl -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          <div className="lg:col-span-7">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles size={20} className="text-gold" />
                <h2 className="text-4xl md:text-5xl font-bold text-[#021f14] font-['Playfair_Display']">Custom Inquiry</h2>
              </div>
              <p className="text-gray-500 text-lg">Share your vision, and we’ll weave it into a reality.</p>
            </div>

            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white p-2 rounded-[42px] shadow-2xl shadow-emerald-900/10 border border-gray-100"
            >
                <form 
                    ref={formRef}
                    onSubmit={sendEmail}
                    className="bg-[#fafbfc] p-8 md:p-12 rounded-[40px] space-y-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-emerald-900 ml-1">Full Name</label>
                        <input name="user_name" required type="text" placeholder="David Miller" className="w-full bg-white border-b-2 border-gray-100 p-4 outline-none focus:border-gold transition-all text-black placeholder:text-gray-300" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-emerald-900 ml-1">Email Address</label>
                        <input name="user_email" required type="email" placeholder="david@example.com" className="w-full bg-white border-b-2 border-gray-100 p-4 outline-none focus:border-gold transition-all text-black placeholder:text-gray-300" />
                    </div>
                    </div>
                    
                    <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-emerald-900 ml-1">What's on your mind?</label>
                    <select name="subject" className="w-full bg-white border-b-2 border-gray-100 p-4 outline-none focus:border-gold transition-all appearance-none text-black cursor-pointer">
                        <option>General Inquiry</option>
                        <option>Custom 7-Day Tour</option>
                        <option>14-Day Exclusive Package</option>
                        <option>Honeymoon Special</option>
                    </select>
                    </div>

                    <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-emerald-900 ml-1">Message</label>
                    <textarea name="message" required placeholder="Tell us about your group size, preferred dates, or specific dreams..." className="w-full bg-white border-b-2 border-gray-100 p-4 outline-none focus:border-gold h-44 resize-none transition-all text-black placeholder:text-gray-300"></textarea>
                    </div>
                    
                    <button 
                    type="submit" 
                    disabled={isSending}
                    className="group relative w-full py-6 bg-[#021f14] text-white rounded-2xl font-black text-[11px] tracking-[0.3em] uppercase overflow-hidden transition-all hover:shadow-2xl hover:shadow-emerald-900/40 disabled:opacity-70"
                    >
                    <div className="absolute inset-0 w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full -z-0 opacity-10" />
                    <span className="relative z-10 flex items-center justify-center gap-4">
                        {isSending ? (
                        <>SENDING... <Loader2 className="animate-spin" size={18} /></>
                        ) : (
                        <>SEND MESSAGE <Send size={18} className="text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                        )}
                    </span>
                    </button>

                    {status === "SUCCESS" && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-emerald-600 font-bold text-sm mt-4">✓ Message sent successfully! Expect a reply within 24 hours.</motion.p>
                    )}
                    {status === "ERROR" && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-red-500 font-bold text-sm mt-4">⚠ Something went wrong. Please check your details.</motion.p>
                    )}
                </form>
            </motion.div>
          </div>

          {/* --- HELP & LOCATION --- */}
          <div className="lg:col-span-5 space-y-12">
            <div className="bg-white p-10 rounded-[40px] shadow-xl shadow-emerald-900/5 border border-gray-50">
              <h2 className="text-2xl font-bold text-[#021f14] font-['Playfair_Display'] mb-8 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gold rounded-full" /> Frequently Asked
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-gray-100 last:border-0 pb-4">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full flex justify-between items-center text-left py-2 group"
                    >
                      <span className={`font-bold text-[13px] uppercase tracking-wider transition-colors ${activeFaq === idx ? "text-gold" : "text-[#021f14] group-hover:text-emerald-700"}`}>{faq.question}</span>
                      {activeFaq === idx ? <Minus size={16} className="text-gold" /> : <Plus size={16} className="text-gray-300" />}
                    </button>
                    <AnimatePresence>
                      {activeFaq === idx && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="py-4 text-gray-500 text-sm leading-relaxed font-medium">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#021f14] p-12 rounded-[40px] text-white relative overflow-hidden group shadow-2xl shadow-emerald-950/40">
              <div className="absolute -top-10 -right-10 p-6 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000">
                <MapPin size={240} />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-1 bg-gold mb-6" />
                <h4 className="text-gold font-black text-xs tracking-[0.3em] uppercase mb-4">Our Local Presence</h4>
                <h5 className="text-3xl font-['Playfair_Display'] mb-6">Visit Our Sanctuary</h5>
                <p className="text-white/60 text-sm mb-10 leading-loose">
                  Our main hub is nestled between the lagoon and the sea. Come share a cup of Ceylon tea and let's map out your next adventure.
                </p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-white text-[#021f14] px-8 py-4 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all hover:bg-gold"
                >
                  GET DIRECTIONS <ExternalLink size={14} />
                </a>
              </div>
            </div>
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
    <footer className="bg-[#01140d] text-white pt-32 pb-12 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <h3 className="text-3xl font-bold font-['Playfair_Display'] tracking-tight">
              AMAYO<span className="text-gold italic">TOURS</span>
            </h3>
            <p className="text-white/40 text-sm leading-relaxed font-light">
              Crafting bespoke journeys through the heart of Sri Lanka. From misty highlands to golden shores, we are your local gateway to paradise.
            </p>
          </div>

          <div className="space-y-8">
            <h4 className="text-gold text-[10px] font-black uppercase tracking-[0.4em]">Navigate</h4>
            <ul className="space-y-4 text-[13px] font-bold tracking-wide">
              <li><a href="/" className="text-white/60 hover:text-gold transition-colors">Home Base</a></li>
              <li><a href="/packages" className="text-white/60 hover:text-gold transition-colors">Tour Curations</a></li>
              <li><a href="/#map" className="text-white/60 hover:text-gold transition-colors">Secret Waypoints</a></li>
              <li><a href="/contact" className="text-white/60 hover:text-gold transition-colors underline decoration-gold underline-offset-8">Contact Us</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-gold text-[10px] font-black uppercase tracking-[0.4em]">Experience</h4>
            <ul className="space-y-4 text-[13px] font-bold tracking-wide text-white/60">
              <li>Private Transfers</li>
              <li>Local Expert Guides</li>
              <li>Boutique Stays</li>
              <li>Itinerary Design</li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-gold text-[10px] font-black uppercase tracking-[0.4em]">Stay Inspired</h4>
            <p className="text-white/40 text-xs leading-relaxed">
              Curated itineraries and exclusive travel offers.
            </p>
            <form className="relative group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-6 pr-14 text-xs focus:border-gold outline-none transition-all text-white placeholder:text-white/20"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-gold rounded-xl flex items-center justify-center text-[#021f14] hover:bg-white transition-colors shadow-lg shadow-gold/20">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] font-black text-white/20 tracking-[0.3em] uppercase">
            © {currentYear} AMAYO TOURS SRI LANKA. AUTHENTIC JOURNEYS ONLY.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-black text-white/20 tracking-[0.3em] uppercase italic">Designed with love by</span>
            <span className="text-gold text-[10px] font-black tracking-[0.3em] uppercase px-3 py-1 bg-gold/10 border border-gold/20 rounded-full">
              Amasha
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}