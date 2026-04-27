"use client";
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect, useRef } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, MessageCircle, ArrowRight, Star, Loader2, X, ChevronLeft, ChevronRight, CloudSun } from 'lucide-react'; 
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PackageCard from '@/components/PackageCard';

// Initialize Supabase
const supabase = createClient(
  'https://uatanoaooocnuawwoycd.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhdGFub2Fvb29jbnVhd3dveWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMTkwOTAsImV4cCI6MjA5MjU5NTA5MH0.XVrkn97OtpPnBXtvDaqGjYqJIPgzAiseANYHU1oPKYw'
);

const FadeInSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

const WebsiteLoader = () => (
  <motion.div
    key="loader"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    className="fixed inset-0 z-[200] bg-[#021f14] flex flex-col items-center justify-center"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-24 h-24 border-t-2 border-b-2 border-gold rounded-full"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-gold font-black text-xs tracking-tighter">AMAYO</span>
      </div>
    </motion.div>
    <motion.p
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-gold/50 text-[10px] uppercase tracking-[0.5em] mt-8 font-black"
    >
      Preparing Your Journey
    </motion.p>
  </motion.div>
);

const hotspots = [
  { id: "anuradhapura", name: "Anuradhapura", top: "35%", left: "40%", climate: "Hot & Dry", activities: "Sacred Bo Tree, Ancient Stupas.", description: "Step into the cradle of civilization and ruins of a 2,500-year-old city." },
  { id: "sigiriya", name: "Sigiriya", top: "40%", left: "50%", climate: "Tropical", activities: "Lion Rock Hike, Mirror Wall.", description: "An ancient rock fortress rising 200m from the jungle." },
  { id: "kandy", name: "Kandy", top: "58%", left: "50%", climate: "Mild & Humid", activities: "Temple of the Tooth, Botanical Gardens.", description: "The last royal capital, nestled among mist-covered hills." },
  { id: "kitulgala", name: "Kitulgala", top: "63%", left: "37%", climate: "Wet & Lush", activities: "White Water Rafting.", description: "The adrenaline capital where the river carves through rainforest." },
  { id: "ella", name: "Ella", top: "58%", left: "62%", climate: "Cool & Crisp", activities: "Nine Arch Bridge, Little Adam’s Peak.", description: "A cinematic escape through emerald tea estates." },
  { id: "galle", name: "Galle", top: "80%", left: "32%", climate: "Coastal Breeze", activities: "Fort Walk, Lighthouse Sunset.", description: "Where European architecture meets tropical waters." }
];

const allTours = [
  { title: "Kandy Cultural Tour", duration: "10 Hours", price: "$45", category: "Hill Country", image: "temple.jpeg", rating: 4.8, isBestSeller: true, highlights: ["Temple of Tooth Relic", "Royal Botanical Gardens", "Dance Show"] },
  { title: "Anuradhapura Heritage", duration: "1 Day", price: "$95", category: "Adventure", image: "anuradhapura.jpeg", rating: 4.9, highlights: ["Sacred Bodhi Tree", "Ruwanwelisaya", "Isurumuniya Temple"] },
  { title: "Nuwara Eliya Highlands", duration: "1 Day", price: "$75", category: "Hill Country", image: "nuwaraeliya.jpeg", rating: 4.7, highlights: ["Tea Factory", "Gregory Lake", "Post Office"] },
  { title: "Galle Fort & Coastal", duration: "1 Day", price: "$90", category: "Beach", image: "galle.jpeg", rating: 4.9, isBestSeller: true, highlights: ["Galle Fort Walk", "Stilt Fishing", "Turtle Hatchery"] },
  { title: "Kitulgala Rafting", duration: "1 Day", price: "$60", category: "Adventure", image: "kithulgala.jpeg", rating: 4.6, highlights: ["Rafting", "Confidence Jumps", "Jungle Lunch"] },
  { title: "Sigiriya Lion Rock", duration: "1 Day", price: "$85", category: "Adventure", image: "sigiriya.jpeg", rating: 5.0, isBestSeller: true, highlights: ["Lion's Rock Hike", "Dambulla Caves", "Village Safari"] }
];

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [activeSpot, setActiveSpot] = useState(hotspots[2]); 
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', location: '', text: '', rating: 5 });

  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase.from('reviews').select('*').eq('is_approved', true).order('created_at', { ascending: false });
      if (data) setReviews(data);
    };
    fetchReviews();
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.from('reviews').insert([{ name: formData.name, location: formData.location, text: formData.text, rating: parseInt(formData.rating), is_approved: false }]);
    setIsSubmitting(false);
    if (!error) {
      alert("Success! Story pending approval.");
      setFormData({ name: '', location: '', text: '', rating: 5 });
      setShowReviewForm(false);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <WebsiteLoader key="loader" />
        ) : (
          <motion.main key="main-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative min-h-screen overflow-x-hidden bg-[#021f14] font-['Inter',sans-serif]">
            
            <Navbar />
            <Hero />
            
            {/* FLEET SECTION - Optimized for Mobile */}
            <section className="h-[450px] lg:h-[600px] relative z-10 overflow-hidden bg-[#021f14] border-b border-white/5">
              <div className="h-full w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6">
                <div className="w-full lg:w-1/3 mb-10 lg:mb-0 text-center lg:text-left z-20">
                  <FadeInSection>
                    <span className="text-gold font-bold tracking-[0.4em] text-[10px] uppercase block mb-4">Premium Fleet</span>
                    <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tight font-['Playfair_Display']">
                      Curated <br /> <span className="text-gold underline decoration-white/10">Travel</span>
                    </h2>
                  </FadeInSection>
                </div>
                <div className="h-[250px] lg:h-full w-full lg:w-2/3 flex justify-center lg:justify-end overflow-visible">
                  <div className="h-full flex flex-nowrap items-stretch gap-1 md:gap-2">
                    <SlantedFrame image="nano.jpg" label="Budget" delay={0.1} />
                    <SlantedFrame image="scooter.jpg" label="Scooters" delay={0.2} />
                    <SlantedFrame image="axio.jpg" label="Luxury" delay={0.3} />
                    <SlantedFrame image="van.jpg" label="Vans" delay={0.4} />
                  </div>
                </div>
              </div>
            </section>
            <div className="bg-[#021f14] py-12 flex items-center justify-center">
    <div className="flex items-center w-full max-w-4xl px-6">
      <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
      <div className="mx-4 rotate-45 w-2 h-2 border border-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
      <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
    </div>
  </div>

            {/* ABOUT SECTION */}
            <section id="about" className="py-24 px-6 bg-white relative z-20">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                  <div className="w-full lg:w-1/2">
                    <FadeInSection>
                      <div className="rounded-[40px] overflow-hidden shadow-2xl border border-black/5 group">
                        <img src="beauty.jpg" alt="About" className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                    </FadeInSection>
                  </div>
                  <div className="w-full lg:w-1/2 space-y-6">
                    <FadeInSection delay={0.2}>
                      <h2 className="text-5xl md:text-6xl font-bold text-[#021f14] leading-[1.1] font-['Playfair_Display']">The Spirit of <span className="text-emerald-700 italic">Kandy</span></h2>
                      <p className="text-[#021f14]/80 leading-relaxed text-lg">
                        <span className="text-gold font-extrabold">Amayo Tours</span> connects you to the soul of the island. We provide more than just transport—we provide memories, guiding you to secret turquoise bays and mist-covered tea hills.
                      </p>
                      <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-8">
                        <StatBlockDark value="100%" label="Local" />
                        <StatBlockDark value="24/7" label="Support" />
                        <StatBlockDark value="5.0" label="Rating" />
                      </div>
                    </FadeInSection>
                  </div>
                </div>
                
            </section>

  <div className="bg-[#021f14] w-full overflow-hidden leading-[0] rotate-180">
    <svg className="relative block w-[calc(100%+1.3px)] h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="rgba(255,255,255,0.03)">
      </path>
    </svg>
  </div>

            {/* MAP SECTION - Performance Adjusted */}
            <section id="map" className="py-24 px-6 relative z-10 bg-[#021f14]">
                <div className="max-w-7xl mx-auto">
                    <FadeInSection>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-white font-['Playfair_Display']">Select Your <span className="text-gold">Waypoint</span></h2>
                            <p className="text-gold/40 text-[10px] uppercase tracking-[0.3em] font-black mt-4">Tap pins to explore</p>
                        </div>
                    </FadeInSection>

                    <div className="bg-white/5 md:backdrop-blur-xl p-6 md:p-12 rounded-[50px] border border-white/10 flex flex-col lg:flex-row gap-12 items-center">
                        <div className="w-full lg:w-1/2 relative flex justify-center py-6 bg-black/20 rounded-[30px]">
                            <div className="relative w-[280px] h-[420px] md:w-[340px] md:h-[510px]">
                                <img src="lankaa.png" className="w-full h-full object-contain opacity-60" alt="Map" />
                                {hotspots.map((spot) => (
                                    <motion.button 
                                        key={spot.id} 
                                        onClick={() => setActiveSpot(spot)} 
                                        whileHover={{ scale: 1.2 }}
                                        className="absolute group transform -translate-x-1/2 -translate-y-1/2 z-30" 
                                        style={{ top: spot.top, left: spot.left }}
                                    >
                                        <MapPin 
                                            className={`transition-all duration-300 ${activeSpot.id === spot.id ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'text-red-400/50'}`} 
                                            size={activeSpot.id === spot.id ? 36 : 24} 
                                            fill={activeSpot.id === spot.id ? "currentColor" : "none"} 
                                        />
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2">
                            <AnimatePresence mode="wait">
                                <motion.div key={activeSpot.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                                    <div className="flex items-center gap-3 text-gold/60 text-xs font-black uppercase tracking-widest">
                                      <CloudSun size={16} /> {activeSpot.climate}
                                    </div>
                                    <h3 className="text-5xl font-bold text-white uppercase font-['Playfair_Display']">{activeSpot.name}</h3>
                                    <p className="text-white/60 text-lg font-light leading-relaxed">{activeSpot.description}</p>
                                    <div className="bg-gold/10 p-5 rounded-2xl border border-gold/20">
                                        <p className="text-gold font-bold text-[10px] tracking-widest uppercase mb-2">Must Experience</p>
                                        <p className="text-white/80 text-sm">{activeSpot.activities}</p>
                                    </div>
                                    <button onClick={() => document.getElementById('tours').scrollIntoView({ behavior: 'smooth' })} className="bg-white text-[#021f14] px-8 py-4 rounded-xl font-black flex items-center gap-3 hover:bg-gold transition-all text-sm">
                                        EXPLORE PACKAGES <ArrowRight size={18} />
                                    </button>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* MARQUEE */}
            <div className="bg-gold py-4 overflow-hidden flex whitespace-nowrap relative z-30">
              <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 20, repeat: Infinity }} className="flex gap-16 items-center">
                {[...Array(8)].map((_, i) => (
                  <span key={i} className="text-[#021f14] font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-4">
                    <Star size={12} fill="currentColor"/> AIRPORT TRANSFERS 24/7 <Star size={12} fill="currentColor"/>
                  </span>
                ))}
              </motion.div>
            </div>

            {/* TOURS SECTION */}
            <section id="tours" className="relative py-24 px-6 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img src="sea.jpg" alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#021f14]/95 md:backdrop-blur-sm" />
              </div>
              <div className="max-w-7xl mx-auto relative z-10">
                <FadeInSection>
                  <div className="text-center mb-16">
                      <h2 className="text-5xl font-bold text-white mb-8 font-['Playfair_Display']">Tour <span className="text-gold italic">Suites</span></h2>
                      <div className="flex flex-wrap justify-center gap-2">
                          {["All", "Hill Country", "Beach", "Adventure"].map((cat) => (
                              <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 rounded-lg font-bold transition-all text-[10px] uppercase tracking-widest ${filter === cat ? "bg-gold text-[#021f14]" : "bg-white/10 text-white/40"}`}>{cat}</button>
                          ))}
                      </div>
                  </div>
                </FadeInSection>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {allTours.filter(t => filter === "All" || t.category === filter).map((tour) => (
                      <motion.div key={tour.title} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <PackageCard {...tour} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </section>
<div className="h-px w-full bg-transparent relative">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/30 to-transparent blur-[1px]"></div>
    {/* Central bright point */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-[2px] bg-gold shadow-[0_0_15px_#D4AF37]"></div>
  </div>
            
            {/* REVIEWS SECTION */}

            {/* REVIEWS SECTION */}
<section 
  id="reviews" 
  className="relative py-32 overflow-hidden bg-[#021f14] bg-cover bg-center"
  style={{ 
    backgroundImage: `linear-gradient(to bottom, rgba(2, 31, 20, 0.9), rgba(2, 31, 20, 0.9)), url('tiger.jpg')` 
  }}
>

              <div className="max-w-7xl mx-auto px-6 relative z-10">

                <FadeInSection>

                  <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8">

                    <div className="max-w-2xl text-center md:text-left">

                      <span className="text-gold font-bold tracking-[0.3em] text-xs uppercase bg-white/5 border border-white/10 px-4 py-2 rounded-full">Voices of the Island</span>

                      <h2 className="text-6xl md:text-7xl font-bold text-white mt-6 font-['Playfair_Display']">Traveler <span className="text-gold italic">Stories</span></h2>

                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">

                      <button onClick={() => setShowAllReviews(true)} className="px-8 py-4 rounded-xl border border-gold/50 text-gold font-black hover:bg-gold hover:text-black transition-all text-sm uppercase tracking-widest">SEE ALL REVIEWS</button>

                      <button onClick={() => setShowReviewForm(!showReviewForm)} className="bg-gold text-[#021f14] px-10 py-5 rounded-2xl font-black hover:bg-white transition-all flex items-center gap-3">

                        {showReviewForm ? "VIEW STORIES" : "LEAVE YOUR MARK"} <ArrowRight />

                      </button>

                    </div>

                  </div>

                </FadeInSection>



                <AnimatePresence>

                  {showReviewForm && (

                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="mb-24">

                        <div className="bg-white/10 backdrop-blur-2xl p-8 md:p-16 rounded-[50px] border border-white/20 max-w-4xl mx-auto">

                            <form onSubmit={handleReviewSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

                              <div className="space-y-2">

                                <label className="text-gold text-[10px] font-black uppercase tracking-widest ml-2">Full Name</label>

                                <input required type="text" className="w-full bg-black/20 text-white p-5 rounded-2xl border border-white/10 outline-none focus:border-gold" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />

                              </div>

                              <div className="space-y-2">

                                <label className="text-gold text-[10px] font-black uppercase tracking-widest ml-2">Origin</label>

                                <input required type="text" className="w-full bg-black/20 text-white p-5 rounded-2xl border border-white/10 outline-none focus:border-gold" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />

                              </div>

                              <div className="md:col-span-2 space-y-2">

                                <label className="text-gold text-[10px] font-black uppercase tracking-widest ml-2">Rate Experience</label>

                                <div className="flex bg-black/20 p-2 rounded-2xl border border-white/10">

                                  {[1, 2, 3, 4, 5].map((star) => (

                                    <button key={star} type="button" onClick={() => setFormData({...formData, rating: star})} className="flex-1 py-3 flex justify-center">

                                      <Star size={24} fill={formData.rating >= star ? "#D4AF37" : "none"} className={formData.rating >= star ? "text-gold" : "text-white/20"} />

                                    </button>

                                  ))}

                                </div>

                              </div>

                              <textarea required className="md:col-span-2 w-full bg-black/20 text-white p-5 rounded-2xl border border-white/10 outline-none h-40 resize-none" value={formData.text} onChange={(e) => setFormData({...formData, text: e.target.value})}></textarea>

                              <button disabled={isSubmitting} type="submit" className="md:col-span-2 bg-gold text-[#021f14] p-6 rounded-2xl font-black text-lg hover:bg-white disabled:opacity-50">

                                {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "PUBLISH MY STORY"}

                              </button>

                            </form>

                        </div>

                    </motion.div>

                  )}

                </AnimatePresence>



                <div className="relative group">

                  <button onClick={() => scroll('left')} className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-gold text-[#021f14] p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all hidden md:block"><ChevronLeft size={32} /></button>

                  <button onClick={() => scroll('right')} className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-gold text-[#021f14] p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all hidden md:block"><ChevronRight size={32} /></button>

                  <div ref={scrollContainerRef} className="flex overflow-x-auto gap-8 pb-12 no-scrollbar snap-x snap-mandatory">

                    {reviews.map((rev) => (

                      <div key={rev.id} className="min-w-[300px] md:min-w-[400px] snap-center">

                        <ReviewCard {...rev} />

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </section>



            {/* FULL REVIEWS MODAL */}

            <AnimatePresence>

              {showAllReviews && (

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-[#021f14] overflow-y-auto px-6 py-20">

                  <button onClick={() => setShowAllReviews(false)} className="fixed top-8 right-8 text-gold bg-white/5 p-4 rounded-full border border-white/10 hover:bg-gold hover:text-black z-[310]"><X size={32} /></button>

                  <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-20">

                      <h2 className="text-6xl font-bold text-white font-['Playfair_Display']">The Full <span className="text-gold italic">Collection</span></h2>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                      {reviews.map((rev) => <ReviewCard key={rev.id} {...rev} />)}

                    </div>

                  </div>

                </motion.div>

              )}

            </AnimatePresence>



            {/* BOTTOM BOOKING MARQUEE */}

            <div className="bg-white py-6 overflow-hidden flex whitespace-nowrap relative z-30">

              <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 25, repeat: Infinity }} className="flex gap-20 items-center">

                {[...Array(12)].map((_, i) => (

                  <span key={i} className="text-[#021f14] font-black uppercase tracking-[0.4em] text-xs flex items-center gap-6">

                    <Star size={16} fill="currentColor"/> WANNA BOOK YOUR NEXT ADVENTURE? DON'T WAIT BOOK NOW! <Star size={16} fill="currentColor"/>

                  </span>

                ))}

              </motion.div>

            </div>



            {/* CONTACT SECTION */}

            <section id="contact" className="py-32 relative px-6 bg-[#021f14]">

              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">

                <div className="lg:w-1/2 space-y-10">

                  <FadeInSection>

                    <h2 className="text-6xl font-bold text-white font-['Playfair_Display']">Start Your <br/><span className="text-gold italic">Expedition.</span></h2>

                    <div className="space-y-6 text-white/70 mt-10">

                      <div className="flex gap-5 items-center">

                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-gold"><MapPin/></div>

                        <p>No: 10 Dharmaraja Mawatha, Kandy</p>

                      </div>

                      <div className="flex gap-5 items-center">

                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-gold"><Phone/></div>

                        <p>+94 777 472 445</p>

                      </div>

                    </div>

                    <a href="https://wa.me/94777472445" className="inline-flex items-center gap-4 bg-[#25D366] text-white px-12 py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-105 transition-all mt-10">

                      <MessageCircle size={28} /> WHATSAPP CHAT

                    </a>

                  </FadeInSection>

                </div>

                <div className="lg:w-1/2 w-full h-[500px] rounded-[40px] overflow-hidden border border-white/10">

                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.514309322244!2d80.64332937588665!3d7.295988513725515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3662de3666d6d%3A0x6b1070e635741632!2sDharmaraja%20Mawatha%2C%20Kandy!5e0!3m2!1sen!2slk!4v1714151234567!5m2!1sen!2slk" width="100%" height="100%" style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} allowFullScreen="" loading="lazy"></iframe>

                </div>

              </div>

            </section>

            {/* Floating WhatsApp */}
            <motion.a href="https://wa.me/94777472445" target="_blank" whileHover={{ scale: 1.1 }} className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl">
              <MessageCircle size={28} fill="currentColor" />
            </motion.a>
          </motion.main>
        )}
      </AnimatePresence>
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
      `}</style>
    </>
  );
}

// --- Helper Components ---

function SlantedFrame({ image, label, delay }) {
  return (
    <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay }} className="relative flex-shrink-0 h-full overflow-hidden">
      <div className="h-full w-20 md:w-32 lg:w-56 bg-white/5 border-x border-white/10 transform -skew-x-12 group relative overflow-hidden">
        <div className="absolute inset-0 w-[200%] h-full left-[-50%] transform skew-x-12">
          <img src={image} alt={label} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" />
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 skew-x-12 z-10 hidden md:block">
          <span className="text-white font-black text-[9px] uppercase tracking-widest bg-black/80 px-3 py-1.5 border border-white/10 whitespace-nowrap">{label}</span>
        </div>
      </div>
    </motion.div>
  );
}

function StatBlockDark({ value, label }) {
    return (
        <div>
            <h4 className="text-3xl font-bold text-[#021f14] font-['Playfair_Display']">{value}</h4>
            <p className="text-[9px] text-emerald-700 font-black uppercase tracking-widest">{label}</p>
        </div>
    );
}

function ReviewCard({ name, location, text, rating = 5 }) {
  return (
    <div className="p-6 h-full rounded-[25px] border border-white/10 bg-white/5 flex flex-col justify-between min-h-[250px]">
      <div>
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < rating ? "text-gold" : "text-white/10"} fill={i < rating ? "currentColor" : "none"} />)}
        </div>
        <p className="text-white/90 text-md italic leading-relaxed font-['Playfair_Display']">"{text}"</p>
      </div>
      <div className="flex items-center gap-3 mt-6">
        <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center font-bold text-black text-[10px]">{name ? name.charAt(0) : "G"}</div>
        <div>
          <h4 className="font-bold text-xs text-white">{name}</h4>
          <p className="text-[8px] text-white/40 uppercase tracking-widest">{location}</p>
        </div>
      </div>
    </div>
  );
}