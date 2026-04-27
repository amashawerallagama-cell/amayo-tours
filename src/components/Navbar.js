"use client"; 
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to close mobile menu after clicking a link
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-jungle/90 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        
<div 
  className="flex items-center gap-3 cursor-pointer group" 
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
>
  <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-gold/20">
    <img 
      src="amayo.png" 
      alt="Amayo Tours Logo" 
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
    />
    {/* Subtle glow effect behind the logo */}
    <div className="absolute inset-0 bg-gold/10 blur-xl -z-10 group-hover:bg-gold/20 transition-colors"></div>
  </div>
  
  <h1 className="text-gold font-bold text-2xl tracking-tighter font-['Playfair_Display']">
    AMAYO <span className="text-white/90 font-light">TOURS</span>
  </h1>
</div>
        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-sand/90 font-medium uppercase text-[12px] tracking-widest">
          <Link href="/" className="hover:text-gold transition">Home</Link>
          <Link href="/#about" className="hover:text-gold transition">About</Link>
          <Link href="/#tours" className="hover:text-gold transition">Tours</Link>
          <Link href="/#reviews" className="hover:text-gold transition">Reviews</Link>
          <Link href="/#map" className="hover:text-gold transition">Locations</Link>
          <Link href="/#contact" className="hover:text-gold transition">Contact</Link>
        </div>

        {/* Desktop Button */}
        <a href="https://wa.me/94777472445" className="hidden md:block bg-gold text-jungle px-5 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform">
          BOOK NOW
        </a>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gold"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-jungle border-t border-white/10 p-6 flex flex-col gap-6 text-sand text-lg font-medium">
          <Link href="/" onClick={closeMenu}>Home</Link>
          <Link href="/#about" onClick={closeMenu}>About Us</Link>
          <Link href="/#tours" onClick={closeMenu}>Tours</Link>
          <Link href="/#reviews" onClick={closeMenu}>Reviews</Link>
          <Link href="/#map" onClick={closeMenu}>Locations</Link>
          <Link href="/#contact" onClick={closeMenu}>Contact</Link>
          
          <a href="https://wa.me/94777472445" className="bg-gold text-jungle text-center py-3 rounded-xl font-bold">
            BOOK ON WHATSAPP
          </a>
        </div>
      )}
    </nav>
  );
}