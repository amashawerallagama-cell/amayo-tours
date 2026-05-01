"use client";
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect, useRef } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, MessageCircle, ArrowRight, Star, Loader2, X, ChevronLeft, ChevronRight, CloudSun, Send, Instagram, Twitter, Compass, Wind, Map as MapIcon,Globe, Quote, } from 'lucide-react'; 
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
  { 
    title: "Kandy Cultural Heritage", 
    category: "Hill Country", 
    image: "temple.jpeg", 
    rating: 4.8, 
    highlights: ["Tooth Relic Temple", "Botanical Garden", "Ambuluwawa Tower"],
    fullDetails: "Explore the last royal capital of Sri Lanka. Visit the historical Dalada Maligawa (Temple of the Tooth), stroll through the Royal Botanical Garden Peradeniya, and witness the stunning 360-degree views from Ambuluwawa Tower. Experience Kandyan cultural events, the bustling market, and local craftsmanship including Batik, Silk, Gems, and Wood carvings."
  },
  { 
    title: "Ancient Cities & Fortresses", 
    category: "Adventure", 
    image: "sigiriya.jpeg", 
    rating: 4.9, 
    highlights: ["Sigiriya Lion Rock", "Anuradhapura Ruins", "Polonnaruwa"],
    fullDetails: "Journey through the Cultural Triangle. Ascend the majestic Sigiriya Lion Rock and Pidurangala. In Anuradhapura, visit the sacred Atamasthana, Ruwanwelisaya, and Sri Maha Bodhi. Discover the ruins of Polonnaruwa, the Dambulla Cave Temple, and enjoy an authentic Herbal Village tour with traditional massages."
  },
  { 
    title: "Highland Tea & Scenic Ella", 
    category: "Hill Country", 
    image: "nuwaraeliya.jpeg", 
    rating: 4.7, 
    highlights: ["N'eliya to Ella Train", "Nine Arch Bridge", "Tea Factory"],
    fullDetails: "Witness the breathtaking landscapes of Nuwara Eliya, the 'Little England' of Sri Lanka. Tour active tea factories and estates, visit majestic waterfalls, and take the world-famous scenic train ride to Ella. Explore the iconic Nine Arch Bridge, Little Adam's Peak, and hidden nature walks."
  },
  { 
    title: "Southern Coastal Escape", 
    category: "Beach", 
    image: "galle.jpeg", 
    rating: 4.9, 
    highlights: ["Galle Fort", "Unawatuna Beach", "Turtle Farm"],
    fullDetails: "Discover the colonial charm of the UNESCO-listed Galle Fort. Relax at Unawatuna Beach, witness traditional stilt fishing, and visit a Turtle Hatchery. This region is perfect for sunset lovers and those seeking a blend of history and tropical leisure."
  },
  { 
    title: "Trincomalee Marine Life", 
    category: "Beach", 
    image: "marinelife.jpeg", 
    rating: 4.8, 
    highlights: ["Pigeon Island", "Nilaveli Beach", "Koneshwaram Kovil"],
    fullDetails: "Escape to the pristine East Coast. Dive or snorkel at Pigeon Island, relax on the white sands of Nilaveli Beach, and visit the cliffside Koneshwaram Kovil. This tour offers world-class whale watching and some of the clearest waters in the Indian Ocean."
  },
  { 
    title: "Wildlife & Nature Safari", 
    category: "Adventure", 
    image: "kithulgala.jpeg", 
    rating: 5.0, 
    highlights: ["Elephant Orphanage", "Yala Safari", "River Rafting"],
    fullDetails: "Get close to nature. Visit the Pinnawala Elephant Orphanage for bathing and feeding sessions. Experience a thrilling Leopard safari in Yala National Park, or go White Water Rafting in the rainforests of Kitulgala."
  }
];

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [activeSpot, setActiveSpot] = useState(hotspots[2]); 
  const [selectedTour, setSelectedTour] = useState(null); 
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', location: '', text: '', rating: 5 });
  
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

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
  const toggleForm = () => {
    setShowReviewForm((prev) => !prev);
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
            
            {/* FLEET SECTION */}
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

            {/* DECORATIVE DIVIDER */}
            <div className="bg-[#021f14] py-12 flex items-center justify-center">
              <div className="flex items-center w-full max-w-4xl px-6">
                <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
                <div className="mx-4 rotate-45 w-2 h-2 border border-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
              </div>
            </div>

           {/* ABOUT SECTION */}
<section id="about" className="py-24 px-6 bg-white relative z-20 overflow-hidden">
  {/* Decorative Background Element */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50 -mr-48 -mt-24" />

  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
    
    {/* Image Side with Floating Badge */}
    <div className="w-full lg:w-1/2 relative">
      <FadeInSection>
        <div className="relative">
          <div className="rounded-[40px] overflow-hidden shadow-2xl border border-black/5 group">
            <img 
              src="kandy.jpeg" 
              alt="The Spirit of Kandy" 
              className="w-full h-[500px] md:h-[650px] object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
          </div>
          
          {/* Floating Experience Card */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-10 -right-6 md:right-10 bg-white p-6 rounded-3xl shadow-2xl border border-gold/20 hidden md:block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                <Globe size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pioneer in</p>
                <p className="text-lg font-bold text-[#021f14]">Local Guiding</p>
              </div>
            </div>
          </motion.div>
        </div>
      </FadeInSection>
    </div>

    {/* Content Side */}
    <div className="w-full lg:w-1/2 space-y-8">
      <FadeInSection delay={0.2}>
        <div className="space-y-4">
          <span className="text-gold font-black text-[11px] tracking-[0.3em] uppercase">Authentic Sri Lanka</span>
          <h2 className="text-5xl md:text-7xl font-bold text-[#021f14] leading-[1.05] font-['Playfair_Display']">
            The Spirit of <br />
            <span className="text-emerald-700 italic">Kandy</span>
          </h2>
        </div>

        <p className="text-[#021f14]/70 leading-relaxed text-xl font-light">
          <span className="text-[#021f14] font-bold">Amayo Tours</span> connects you to the soul of the island. We provide more than just transport—we curate memories, guiding you to secret turquoise bays and mist-covered tea hills.
        </p>

        <div className="grid grid-cols-3 gap-6 py-8 border-y border-gray-100">
          <StatBlockDark value="100%" label="Local" />
          <StatBlockDark value="24/7" label="Support" />
          <StatBlockDark value="5.0" label="Rating" />
        </div>

        {/* Animated Button */}
        <div className="pt-4">
          <motion.a 
            href="/about"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-flex items-center gap-4 group overflow-hidden px-10 py-5 bg-[#021f14] text-white rounded-full font-bold text-sm tracking-widest transition-all"
          >
            {/* Hover Background Slide */}
            <div className="absolute inset-0 w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full" />
            
            <span className="relative z-10 group-hover:text-[#021f14] transition-colors duration-500">
              DISCOVER OUR STORY
            </span>
            <ArrowRight size={20} className="relative z-10 text-gold group-hover:text-[#021f14] group-hover:translate-x-2 transition-all duration-500" />
          </motion.a>
        </div>
      </FadeInSection>
    </div>

  </div>
</section>

            {/* ENHANCED MAP SECTION */}
            <section id="map" className="py-24 px-6 relative z-10 bg-[#01140d]">
              <div className="max-w-7xl mx-auto">
                <FadeInSection>
                  <div className="text-center mb-16">
                    <span className="text-gold font-bold tracking-[0.4em] text-[10px] uppercase block mb-2">Interactive Guide</span>
                    <h2 className="text-5xl font-bold text-white font-['Playfair_Display']">The Jewel of <span className="text-gold italic">The Indian Ocean</span></h2>
                    <p className="text-white/40 text-sm mt-4 max-w-xl mx-auto italic font-light tracking-wide">Select a destination on the map to uncover its secrets and climate profile.</p>
                  </div>
                </FadeInSection>

                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Side: The Interactive Map */}
                  <div className="lg:col-span-7 bg-white/5 backdrop-blur-md p-4 md:p-8 rounded-[40px] border border-white/10 relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="relative w-full aspect-[4/5] md:aspect-square max-h-[600px] flex justify-center items-center">
                      <img src="lankaa.png" className="w-full h-full object-contain opacity-40 drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]" alt="Sri Lanka Map" />
                      
                      {hotspots.map((spot) => (
                        <motion.button 
                          key={spot.id} 
                          onClick={() => setActiveSpot(spot)} 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.3, zIndex: 50 }}
                          className="absolute group transform -translate-x-1/2 -translate-y-1/2 cursor-pointer" 
                          style={{ top: spot.top, left: spot.left }}
                        >
                          {/* Pulsing Aura */}
                          <div className={`absolute inset-0 w-full h-full rounded-full transition-all duration-700 animate-ping opacity-20 ${activeSpot.id === spot.id ? 'bg-gold' : 'bg-white'}`} />
                          
                          <div className={`relative flex flex-col items-center transition-all duration-500 ${activeSpot.id === spot.id ? 'scale-125' : 'scale-100'}`}>
                            <MapPin 
                              className={`transition-all duration-300 ${activeSpot.id === spot.id ? 'text-gold fill-gold drop-shadow-[0_0_15px_rgba(212,175,55,1)]' : 'text-white/40 hover:text-white'}`} 
                              size={activeSpot.id === spot.id ? 38 : 28} 
                            />
                            {/* Label that appears on hover/active */}
                            <span className={`absolute -bottom-6 whitespace-nowrap text-[8px] font-black uppercase tracking-widest transition-all ${activeSpot.id === spot.id ? 'opacity-100 text-gold' : 'opacity-0 group-hover:opacity-60 text-white'}`}>
                              {spot.name}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Right Side: Destination Insight Card */}
                  <div className="lg:col-span-5 lg:sticky lg:top-32">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={activeSpot.id} 
                        initial={{ opacity: 0, x: 30 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden"
                      >
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12">
                          <Compass size={200} />
                        </div>

                        <div className="relative z-10 space-y-8">
                          <div className="flex justify-between items-start">
                            <span className="bg-emerald-700/10 text-emerald-800 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                              <MapIcon size={12} /> Landmark
                            </span>
                            <div className="text-right">
                              <div className="flex items-center gap-2 text-[#021f14]/40 text-[10px] font-black uppercase tracking-widest justify-end mb-1">
                                <Wind size={12} /> Climate
                              </div>
                              <p className="text-[#021f14] font-bold text-sm">{activeSpot.climate}</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-5xl font-black text-[#021f14] uppercase tracking-tighter font-['Playfair_Display'] leading-none mb-4">
                              {activeSpot.name}
                            </h3>
                            <p className="text-[#021f14]/60 text-lg leading-relaxed font-light">
                              {activeSpot.description}
                            </p>
                          </div>

                          <div className="border-y border-[#021f14]/5 py-6 space-y-4">
                            <div className="flex items-center gap-4 text-emerald-900">
                              <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center text-gold">
                                <Star size={18} fill="currentColor" />
                              </div>
                              <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#021f14]/40">Must Experience</p>
                                <p className="text-sm font-bold text-[#021f14]">{activeSpot.activities}</p>
                              </div>
                            </div>
                          </div>

                          <button 
                            onClick={() => document.getElementById('tours').scrollIntoView({ behavior: 'smooth' })} 
                            className="w-full bg-[#021f14] text-white py-6 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gold hover:text-[#021f14] transition-all flex items-center justify-center gap-4 shadow-xl"
                          >
                            Explore Available Packages <ArrowRight size={20} />
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                </div>
              </div>
            </section>

            {/* TOURS SECTION */}
            <section id="tours" className="relative py-24 px-6 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1586375300773-8384e3e4916f?q=80&w=2071" alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#021f14]/95 md:backdrop-blur-sm" />
              </div>
              <div className="max-w-7xl mx-auto relative z-10">
                <FadeInSection>
                  <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-white mb-8 font-['Playfair_Display']">Exclusive <span className="text-gold italic">Journeys</span></h2>
                    <div className="flex flex-wrap justify-center gap-2">
                      {["All", "Hill Country", "Beach", "Adventure"].map((cat) => (
                        <button 
                          key={cat} 
                          onClick={() => setFilter(cat)} 
                          className={`px-6 py-2 rounded-lg font-bold transition-all text-[10px] uppercase tracking-widest ${filter === cat ? "bg-gold text-[#021f14]" : "bg-white/10 text-white/40"}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </FadeInSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {allTours.filter(t => filter === "All" || t.category === filter).map((tour) => (
                      <motion.div key={tour.title} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <PackageCard {...tour} onExplore={() => setSelectedTour(tour)} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* VIEW ALL PACKAGES CALL TO ACTION */}
                <FadeInSection delay={0.2}>
                  <div className="mt-20 text-center">
                    <div className="inline-block p-[1px] rounded-2xl bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-8 w-full max-w-md mx-auto block"></div>
                    <a 
                      href="/packages" 
                      className="inline-flex items-center gap-4 px-12 py-5 rounded-2xl bg-transparent border border-gold/30 text-gold font-black text-xs tracking-[0.3em] uppercase hover:bg-gold hover:text-[#021f14] transition-all duration-500 group"
                    >
                      Explore All Collections
                      <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform duration-500" />
                    </a>
                    <p className="mt-6 text-white/20 text-[9px] uppercase tracking-[0.4em] font-bold">Discover over 20+ hidden destinations</p>
                  </div>
                </FadeInSection>
              </div>
            </section>



           {/* DETAIL MODAL */}
            <AnimatePresence>
              {selectedTour && (
                <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 md:p-10">
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    onClick={() => setSelectedTour(null)}
                    className="absolute inset-0 bg-[#021f14]/90 backdrop-blur-xl cursor-pointer" 
                  />
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-5xl bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-hidden"
                  >
                    <button onClick={() => setSelectedTour(null)} className="absolute top-6 right-6 z-50 bg-[#021f14]/10 p-2 rounded-full hover:bg-[#021f14]/20 transition-colors">
                      <X size={24} className="text-[#021f14]" />
                    </button>

                    <div className="w-full md:w-1/2 h-[300px] md:h-auto">
                      <img src={selectedTour.image} alt={selectedTour.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
                      <span className="text-emerald-700 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">{selectedTour.category}</span>
                      <h2 className="text-4xl md:text-5xl font-bold text-[#021f14] font-['Playfair_Display'] mb-6 leading-tight">{selectedTour.title}</h2>
                      <p className="text-[#021f14]/70 text-lg leading-relaxed mb-8">{selectedTour.fullDetails}</p>
                      
                      <div className="space-y-4 mb-10">
                         <p className="font-black text-[10px] uppercase tracking-widest text-[#021f14]">Key Highlights</p>
                         <div className="flex flex-wrap gap-2">
                           {selectedTour.highlights.map(h => (
                             <span key={h} className="bg-emerald-50 text-emerald-800 text-[10px] px-3 py-1.5 rounded-full font-bold">{h}</span>
                           ))}
                         </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        <a 
                          href={`https://wa.me/94777472445?text=Hi! I am interested in the ${selectedTour.title} journey.`}
                          target="_blank"
                          className="bg-gold text-black text-center py-5 rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-[#021f14] hover:text-white transition-all shadow-xl"
                        >
                          Enquire Now via WhatsApp
                        </a>

                        <a 
                          href="/packages"
                          className="text-center py-4 rounded-2xl border border-[#021f14]/10 text-[#021f14] font-black text-[10px] tracking-widest uppercase hover:bg-[#021f14] hover:text-white transition-all"
                        >
                          Explore More Packages
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* REVIEWS SECTION */}
<section id="reviews" className="relative py-32 overflow-hidden bg-[#021f14] bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(2, 31, 20, 0.9), rgba(2, 31, 20, 0.9)), url('tiger.jpg')` }}>
  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <FadeInSection>
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8">
        <div className="max-w-2xl text-center md:text-left">
          <span className="text-gold font-bold tracking-[0.3em] text-xs uppercase bg-white/5 border border-white/10 px-4 py-2 rounded-full">Voices of the Island</span>
          <h2 className="text-6xl md:text-7xl font-bold text-white mt-6 font-['Playfair_Display']">Traveler <span className="text-gold italic">Stories</span></h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
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
      
      {/* Manual and Auto Scrolling Container */}
      <div 
        ref={scrollContainerRef} 
        className="flex overflow-x-auto gap-8 pb-12 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
      >
        <motion.div 
          className="flex gap-8"
          style={{ width: "max-content" }}
          animate={{ x: [0, "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            },
          }}
        >
          {[...reviews, ...reviews].map((rev, idx) => (
            <div key={`${rev.id}-${idx}`} className="min-w-[320px] md:min-w-[450px] snap-center">
              <ReviewCard {...rev} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </div>
</section>

            
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
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.653457193649!2d80.6406!3d7.2914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTcnMjkuMCJOIDgwwrAzOCcyNi4yIkU!5e0!3m2!1sen!2slk!4v1714000000000!5m2!1sen!2slk" width="100%" height="100%" style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} allowFullScreen="" loading="lazy"></iframe>
                </div>
              </div>
            </section>

            {/* FOOTER SECTION */}
            <Footer />

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
              <li><a href="#about" className="hover:text-gold transition-colors">The Spirit</a></li>
              <li><a href="#map" className="hover:text-gold transition-colors">Waypoints</a></li>
              <li><a href="#tours" className="hover:text-gold transition-colors">Exclusive Journeys</a></li>
              <li><a href="#reviews" className="hover:text-gold transition-colors">Traveler Stories</a></li>
              <li><a href="#contact" className="hover:text-gold transition-colors">Contact</a></li>
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

  {/* Moving this here fixes the Turbopack build error */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
}