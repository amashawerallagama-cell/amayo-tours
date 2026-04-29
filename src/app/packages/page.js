"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare,
  Sparkles,
  Compass,
  X,
  Send,
  Loader2
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const tourPackages = [
  {
    id: 1,
    title: "Essential Island Wonders",
    duration: "7 Days",
    category: "Standard",
    price: "448",
    perPerson: "for 2 persons",
    image: "/images/package1.jpeg",
    description: "A perfect introduction to the cultural heart and hill country of Sri Lanka.",
    tags: ["Cultural Triangle", "Hill Country"],
    itinerary: [
      { day: "Day 1", activity: "Pickup from airport & stay in Kandy" },
      { day: "Day 2", activity: "Visit Kandy Temple & Botanical Garden" },
      { day: "Day 3", activity: "Visit Sigiriya Rock & Dambulla Cave Temple" },
      { day: "Day 4", activity: "Leave Kandy to Nuwara Eliya with sightseeing" },
      { day: "Day 5", activity: "Leave Nuwara Eliya to Ella, stay in Ella" },
      { day: "Day 6", activity: "Full day exploring Ella" },
      { day: "Day 7", activity: "Leave Ella to Galle" }
    ],
    highlights: ["Sigiriya Lion Rock", "Temple of the Tooth", "Ella Gap", "Galle Fort"]
  },
  {
    id: 2,
    title: "Grand Heritage Expedition",
    duration: "14 Days",
    category: "Exclusive",
    price: "Tailored",
    perPerson: "Premium Experience",
    image: "/images/package2.jpeg",
    description: "An immersive 2-week journey covering ancient kingdoms, tea estates, and wild safaris.",
    tags: ["Full Island", "Wildlife"],
    itinerary: [
      { day: "Day 1-3", activity: "Negombo & Ancient Anuradhapura sightseeing" },
      { day: "Day 4-5", activity: "Sigiriya Lion Rock, Village Tour & Herbal Massage" },
      { day: "Day 6-8", activity: "Spice Gardens, Cultural Show & Temple of the Tooth" },
      { day: "Day 9-10", activity: "Tea Factory, Waterfalls & Scenic Ella" },
      { day: "Day 11-12", activity: "Nature walks and a day of rest in Ella" },
      { day: "Day 13", activity: "Wildlife Safari at Yala National Park" },
      { day: "Day 14", activity: "Final destination Galle" }
    ],
    highlights: ["Anuradhapura Atamasthana", "Yala Safari", "Tea Estate Tour", "Village Experience"]
  },
  {
    id: 3,
    title: "The Royal Throne Legacy",
    duration: "5 Days",
    category: "History",
    price: "320",
    perPerson: "per person",
    image: "/images/package3.jpeg",
    description: "Deep dive into the ruins of Anuradhapura and the medieval capital Polonnaruwa.",
    tags: ["History", "UNESCO"],
    itinerary: [
      { day: "Day 1", activity: "Arrival and visit Dambulla Cave Temple" },
      { day: "Day 2", activity: "Full day at Anuradhapura Atamasthana & Kuttam Pokuna" },
      { day: "Day 3", activity: "Exploring Isurumuniya & Ruwanwelisaya" },
      { day: "Day 4", activity: "Polonnaruwa Ancient City ruins & site seeing" },
      { day: "Day 5", activity: "Sigiriya Lion Rock & Pidurangala" }
    ],
    highlights: ["Sri Maha Bodhi", "Polonnaruwa Ruins", "Dambulla Caves"]
  },
  {
    id: 4,
    title: "Medieval Northern Discovery",
    duration: "4 Days",
    category: "History",
    price: "285",
    perPerson: "per person",
    image: "/images/package4.jpeg",
    description: "A focused journey through the ancient ruins and cultural sites of the dry zone.",
    tags: ["Archaeology", "Culture"],
    itinerary: [
      { day: "Day 1", activity: "Visit the sacred Atamasthana in Anuradhapura" },
      { day: "Day 2", activity: "Ancient Kingdom of Polonnaruwa site seeing" },
      { day: "Day 3", activity: "Dambulla Cave Temple & Spice Gardens" },
      { day: "Day 4", activity: "Kandy Temple & Cultural Events" }
    ],
    highlights: ["Ruwanwelisaya", "Kandyan Culture", "Dambulla"]
  },
  {
    id: 5,
    title: "Coastal Bliss & Marine Life",
    duration: "6 Days",
    category: "Beach",
    price: "380",
    perPerson: "per person",
    image: "/images/package5.jpeg",
    description: "Sun-drenched beaches and marine adventures in Trincomalee and Galle.",
    tags: ["Marine", "Relaxation"],
    itinerary: [
      { day: "Day 1", activity: "Trincomalee Beach & Koneshwaram Kovil" },
      { day: "Day 2", activity: "Snorkeling at Pigeon Island" },
      { day: "Day 3", activity: "Whale watching excursion" },
      { day: "Day 4", activity: "Transfer to Galle & Unawatuna" },
      { day: "Day 5", activity: "Turtle Farm & Stilt Fishing" },
      { day: "Day 6", activity: "Galle Fort exploration" }
    ],
    highlights: ["Pigeon Island", "Whale Watching", "Unawatuna Beach"]
  },
  {
    id: 6,
    title: "The Tea Trail & Misty Peaks",
    duration: "5 Days",
    category: "Hill Country",
    price: "310",
    perPerson: "per person",
    image: "/images/package6.jpeg",
    description: "Scenic train rides and rolling tea estates in Nuwara Eliya and Ella.",
    tags: ["Scenic", "Tea"],
    itinerary: [
      { day: "Day 1", activity: "Nuwara Eliya Tea Estates & Factories" },
      { day: "Day 2", activity: "Gregory Lake & Waterfalls" },
      { day: "Day 3", activity: "Iconic Train Ride from N'eliya to Ella" },
      { day: "Day 4", activity: "Nine Arch Bridge & Ella Viewpoint" },
      { day: "Day 5", activity: "Little Adam's Peak nature walk" }
    ],
    highlights: ["Train Ride", "Nine Arch Bridge", "Tea Tasting"]
  }
];

export default function PackagesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeItinerary, setActiveItinerary] = useState(null);
  
  // Email Logic State
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState(""); // "SUCCESS" | "ERROR" | ""

  const categories = ["All", "Standard", "Exclusive", "History", "Beach", "Hill Country"];

  const filteredPackages = selectedCategory === "All" 
    ? tourPackages 
    : tourPackages.filter(p => p.category === selectedCategory);

  const handleCustomQuote = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Replace these strings with your actual EmailJS IDs
    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setEmailStatus("SUCCESS");
        setIsSending(false);
        formRef.current.reset();
        setTimeout(() => setEmailStatus(""), 5000);
      }, (error) => {
        console.error("FAILED...", error.text);
        setEmailStatus("ERROR");
        setIsSending(false);
      });
  };

  return (
    <main className="bg-[#fcfcf9] min-h-screen">
      <Navbar />
      
      {/* Hero Header */}
      <section className="relative pt-44 pb-32 bg-[#021f14] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/Slanka.jpg" 
            alt="Sri Lanka Landscape" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#021f14]/80 via-[#021f14]/60 to-[#fcfcf9]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold font-bold tracking-[0.4em] uppercase text-xs mb-4 block">
              Curated Experiences
            </span>
            <h1 className="text-6xl md:text-8xl font-bold font-['Playfair_Display'] leading-tight">
              Tour <span className="italic text-gold">Packages</span>
            </h1>
            <p className="max-w-xl text-white/70 mt-6 text-lg leading-relaxed">
              From the ancient ruins of the North to the misty tea trails of the hill country, 
              discover the soul of Sri Lanka with our expertly crafted itineraries.
            </p>
          </motion.div>
          
          <div className="flex flex-wrap gap-3 mt-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-3 rounded-full text-[10px] font-black tracking-widest transition-all border ${
                  selectedCategory === cat 
                  ? "bg-gold border-gold text-black shadow-lg shadow-gold/20" 
                  : "border-white/20 text-white/80 hover:border-gold hover:text-gold backdrop-blur-md"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {filteredPackages.map((pkg, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              key={pkg.id}
              className="group bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-black/5"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-2/5 relative overflow-hidden">
                  <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black tracking-widest text-[#021f14]">
                    {pkg.duration.toUpperCase()}
                  </div>
                </div>
                
                <div className="md:w-3/5 p-8 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-emerald-700 font-bold text-[10px] tracking-widest uppercase">{pkg.category}</span>
                    <div className="text-right">
                      <p className="text-2xl font-black text-[#021f14]">{pkg.price === "Tailored" ? "Tailored" : `$${pkg.price}`}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{pkg.perPerson}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#021f14] mb-3 font-['Playfair_Display']">{pkg.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{pkg.description}</p>
                  
                  <div className="space-y-2 mb-8">
                    {pkg.highlights.slice(0, 3).map(h => (
                      <div key={h} className="flex items-center gap-2 text-[11px] font-bold text-gray-700">
                        <CheckCircle2 size={14} className="text-gold" /> {h}
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setActiveItinerary(pkg)}
                    className="mt-auto w-full py-4 bg-[#021f14] text-white rounded-2xl font-black text-xs tracking-widest flex items-center justify-center gap-2 group-hover:bg-gold group-hover:text-black transition-all"
                  >
                    VIEW FULL ITINERARY <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Itinerary Modal Overlay */}
      <AnimatePresence>
        {activeItinerary && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveItinerary(null)}
              className="absolute inset-0 bg-[#021f14]/95 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <div>
                  <span className="text-gold font-black text-[10px] uppercase tracking-widest">{activeItinerary.duration} Plan</span>
                  <h2 className="text-2xl font-bold text-[#021f14] font-['Playfair_Display']">{activeItinerary.title}</h2>
                </div>
                <button onClick={() => setActiveItinerary(null)} className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
                  <X size={24} className="text-[#021f14]" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto space-y-6">
                {activeItinerary.itinerary.map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-black text-[10px]">
                        {i + 1}
                      </div>
                      {i !== activeItinerary.itinerary.length - 1 && <div className="w-[2px] h-full bg-gray-100 my-1 group-hover:bg-gold/20 transition-colors" />}
                    </div>
                    <div className="pb-8">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-1">{item.day}</h4>
                      <p className="text-[#021f14] font-medium leading-relaxed">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-gray-50 flex flex-col sm:flex-row gap-4">
                <a href="https://wa.me/94777472445" className="flex-1 bg-gold text-black text-center py-4 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all">
                  BOOK THIS TRIP
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Manual Inquiry Section */}
      <section id="custom-quote" className="py-24 bg-[#021f14] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
          <Compass size={400} className="text-white" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Sparkles className="text-gold mx-auto mb-6" size={40} />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Playfair_Display']">Craft Your <span className="text-gold italic">Own Journey</span></h2>
            <p className="text-white/60 text-lg">Not finding exactly what you need? Tell us your dream destinations and we will build a custom manual tour just for you.</p>
          </div>

          <form 
            ref={formRef}
            onSubmit={handleCustomQuote}
            className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[40px] border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              <label className="text-gold text-[10px] font-black uppercase tracking-widest ml-2">Full Name</label>
              <input name="user_name" required type="text" placeholder="John Doe" className="w-full bg-white/10 text-white p-5 rounded-2xl border border-white/10 outline-none focus:border-gold transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-gold text-[10px] font-black uppercase tracking-widest ml-2">Preferred Destinations</label>
              <input name="destinations" required type="text" placeholder="e.g. Kandy, Ella, Galle" className="w-full bg-white/10 text-white p-5 rounded-2xl border border-white/10 outline-none focus:border-gold transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-gold text-[10px] font-black uppercase tracking-widest ml-2">Number of Travelers</label>
              <select name="travelers" className="w-full bg-white/10 text-white p-5 rounded-2xl border border-white/10 outline-none focus:border-gold appearance-none">
                <option value="2 Persons" className="bg-[#021f14]">2 Persons</option>
                <option value="3-5 Persons" className="bg-[#021f14]">3-5 Persons</option>
                <option value="Large Group" className="bg-[#021f14]">Large Group</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-gold text-[10px] font-black uppercase tracking-widest ml-2">Approx. Duration</label>
              <input name="duration" type="text" placeholder="e.g. 10 Days" className="w-full bg-white/10 text-white p-5 rounded-2xl border border-white/10 outline-none focus:border-gold transition-all" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-gold text-[10px] font-black uppercase tracking-widest ml-2">Special Requirements</label>
              <textarea name="message" placeholder="Tell us about your interests..." className="w-full bg-white/10 text-white p-5 rounded-2xl border border-white/10 outline-none focus:border-gold h-32 resize-none transition-all"></textarea>
            </div>
            
            <button 
              disabled={isSending}
              type="submit"
              className="md:col-span-2 w-full py-6 bg-gold text-black rounded-2xl font-black text-sm tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>SENDING... <Loader2 className="animate-spin" size={20} /></>
              ) : (
                <>REQUEST CUSTOM QUOTE <MessageSquare size={20} /></>
              )}
            </button>

            {emailStatus === "SUCCESS" && (
              <p className="md:col-span-2 text-center text-emerald-400 font-bold text-sm mt-4">
                Thank you! Your inquiry has been sent successfully.
              </p>
            )}
            {emailStatus === "ERROR" && (
              <p className="md:col-span-2 text-center text-red-400 font-bold text-sm mt-4">
                Something went wrong. Please try again or contact us via WhatsApp.
              </p>
            )}
          </form>
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
              <li><a href="/#contact" className="hover:text-gold transition-colors">Contact</a></li>
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