"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, MapPin, Gift, Phone, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('DE');
  const pathname = usePathname();

  // Bestimmte Seiten haben kein Hero-Bild und brauchen sofort den "Scrolled" Style (dunkler Text)
  const isLightPage = pathname === '/inquiry';
  const showScrolledStyle = isScrolled || isLightPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'MALIA - Alpine Hideaway', href: '/' },
    { name: 'Our Hideaways', href: '/our-hideaways' },
    { name: 'MALIA Specials', href: '/malia-specials' },
    { name: 'The Feeling', href: '/the-feeling' },
    { name: 'The Setting', href: '/the-setting' },
  ];

  const topIcons = [
    { icon: <User size={20} strokeWidth={1.5} />, label: 'Account' },
    { icon: <MapPin size={20} strokeWidth={1.5} />, label: 'Lage' },
    { icon: <Gift size={20} strokeWidth={1.5} />, label: 'Gutscheine' },
    { icon: <Phone size={20} strokeWidth={1.5} />, label: 'Kontakt' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out px-4 md:px-12 py-4 ${showScrolledStyle ? 'bg-white/95 backdrop-blur-sm py-3 shadow-sm' : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-[1800px] mx-auto flex justify-between items-center">

        {/* LINKS: Erste zwei Links */}
        <div className="hidden lg:flex space-x-8 flex-1">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`uppercase tracking-[0.2em] text-[10px] transition-colors ${showScrolledStyle ? 'text-gray-900 hover:text-gray-500' : 'text-white hover:text-gray-300'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* MITTE: Logo zentral */}
        <Link href="/" className={`text-3xl font-serif tracking-[0.3em] transition-colors px-4 ${showScrolledStyle ? 'text-gray-900' : 'text-white'
          }`}>
          <span className="font-light">MALIA</span>
        </Link>

        {/* RECHTS: Icons und Sprachschalter */}
        <div className="hidden lg:flex items-center justify-end space-x-8 flex-1">
          {navLinks.slice(2).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`uppercase tracking-[0.2em] text-[10px] transition-colors ${showScrolledStyle ? 'text-gray-900 hover:text-gray-500' : 'text-white hover:text-gray-300'
                }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Icons-Gruppe */}
          <div className="flex items-center space-x-5 px-4 border-l border-current/20">
            {topIcons.map((item, idx) => (
              <a
                key={idx}
                href={item.label === 'Kontakt' ? '/inquiry' : '#'}
                className={`transition-transform hover:scale-110 ${showScrolledStyle ? 'text-gray-900' : 'text-white'
                  }`}
                title={item.label}
              >
                {item.icon}
              </a>
            ))}
          </div>

          {/* Sprachschalter */}
          <div className="relative group cursor-pointer">
            <div className={`flex items-center space-x-1 pb-1 border-b-[1px] transition-colors ${showScrolledStyle ? 'text-gray-900 border-gray-900' : 'text-white border-white'
              }`}>
              <span className="text-xs font-light tracking-widest">{currentLang}</span>
              <ChevronDown size={14} />
            </div>

            <div className="absolute top-full right-0 mt-2 bg-white text-gray-900 hidden group-hover:block shadow-xl py-2 px-4 min-w-[80px]">
              <div className="cursor-pointer hover:font-bold py-1 text-xs" onClick={() => setCurrentLang('DE')}>DE</div>
              <div className="cursor-pointer hover:font-bold py-1 text-xs" onClick={() => setCurrentLang('ENG')}>ENG</div>
            </div>
          </div>
        </div>

        {/* Mobile Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={showScrolledStyle ? 'text-gray-900' : 'text-white'}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-serif tracking-widest text-gray-900">MALIA</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-gray-900">
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-900 text-xl font-light uppercase tracking-widest"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}