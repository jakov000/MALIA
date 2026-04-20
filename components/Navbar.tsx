"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Gift, Phone, ChevronDown, Mail } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const pathname = usePathname() || '';
  const router = useRouter();
  const t = useTranslations('Navigation');

  // Erkennen der aktuellen Sprache aus dem Pfad (/de/... oder /en/...)
  const currentLocale = pathname.startsWith('/en') ? 'en' : 'de';
  const currentLang = currentLocale === 'en' ? 'ENG' : 'DE';

  const switchLanguage = (newLocale: string) => {
    setLangMenuOpen(false);
    if (pathname.startsWith(`/${newLocale}`)) return;

    // Set the cookie so next-intl middleware remembers the choice and doesn't redirect back to Accept-Language
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    // Build the new path safely
    let newPath = pathname;
    if (pathname === '/') {
      newPath = `/${newLocale}`;
    } else if (pathname.startsWith('/de') || pathname.startsWith('/en')) {
      newPath = pathname.replace(/^\/(de|en)/, `/${newLocale}`);
    } else {
      newPath = `/${newLocale}${pathname}`;
    }

    // Force a full server hit to clear any Next.js client-side caches of the previous language layout
    window.location.href = newPath;
  };

  const isLightPage =
    (pathname.includes("/our-hideaways/") && !pathname.endsWith("/our-hideaways")) ||
    pathname.includes("/booking") ||
    pathname.includes("/admin/login") ||
    pathname.includes("/admin") ||
    pathname.includes("/agb") ||
    pathname.includes("/impressum") ||
    pathname.includes("/datenschutz") ||
    pathname.includes("/success") ||
    pathname.includes("/inquiry") ||
    pathname.includes("/vouchers");
  const showScrolledStyle = isScrolled || isLightPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loc = (path: string) => `/${currentLocale}${path === '/' ? '' : path}`;

  const navLinks = [
    { name: t('hideaways'), href: loc('/our-hideaways') },
    { name: t('specials'), href: loc('/malia-specials') },
    { name: t('feeling'), href: loc('/the-feeling') },
    { name: t('setting'), href: loc('/the-setting') },
  ];

  const topIcons = [
    { icon: <Gift size={20} strokeWidth={1.5} />, label: 'Gutscheine' },
    { icon: <Mail size={20} strokeWidth={1.5} />, label: 'Anfrage' },
    { icon: <Phone size={20} strokeWidth={1.5} />, label: 'Telefon' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out px-4 md:px-12 py-4 ${showScrolledStyle
          ? 'bg-white py-3 shadow-sm'
          : 'bg-white shadow-sm lg:bg-transparent lg:shadow-none py-3 lg:py-6'
        }`}
    >
      <div className="max-w-[1800px] mx-auto flex justify-between items-center">

        {/* LINKS: Logo + First Link */}
        <div className="flex items-center space-x-6 md:space-x-8 flex-1">
          <Link href={loc('/')} className={`text-2xl md:text-3xl font-serif tracking-[0.3em] transition-colors ${showScrolledStyle ? 'text-gray-900' : 'text-gray-900 lg:text-white'
            }`}>
            <span className="font-light uppercase">MALIA</span>
          </Link>
          <div className="hidden lg:flex space-x-8">
            {navLinks.slice(0, 1).map((link) => (
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
        </div>

        {/* RECHTS: Icons und Sprachschalter */}
        <div className="hidden lg:flex items-center justify-end space-x-8 flex-1">
          {navLinks.slice(1).map((link) => (
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
            {topIcons.map((item, idx) => {
              let href = '#';
              switch (item.label) {
                case 'Account': href = loc('/admin/login'); break;
                case 'Anfrage': href = loc('/inquiry'); break;
                case 'Gutscheine': href = loc('/vouchers'); break;
                case 'Telefon': href = 'tel:+436765925596'; break;
              }
              return (
                <Link
                  key={idx}
                  href={href}
                  className={`transition-transform hover:scale-110 ${showScrolledStyle ? 'text-gray-900' : 'text-white'
                    }`}
                  title={item.label}
                >
                  {item.icon}
                </Link>
              );
            })}
          </div>

          {/* Sprachschalter */}
          <div className="relative cursor-pointer">
            <div
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className={`flex items-center space-x-1 pb-1 border-b-[1px] transition-colors ${showScrolledStyle ? 'text-gray-900 border-gray-900' : 'text-white border-white'
                }`}
            >
              <span className="text-xs font-light tracking-widest">{currentLang}</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${langMenuOpen ? 'rotate-180' : ''}`} />
            </div>

            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 bg-white text-gray-900 shadow-xl py-2 px-4 min-w-[80px]"
                >
                  <div className="cursor-pointer hover:font-bold py-1 text-xs" onClick={() => switchLanguage('de')}>DE</div>
                  <div className="cursor-pointer hover:font-bold py-1 text-xs" onClick={() => switchLanguage('en')}>ENG</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-900"
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
                  className="text-gray-900 text-xl font-light uppercase tracking-widest hover:text-gray-500 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Icons and Lang Switcher */}
            <div className="mt-12 flex flex-col space-y-6 border-t border-stone-200 pt-8">
              {topIcons.map((item, idx) => {
                let href = '#';
                let translatedLabel = item.label;
                switch (item.label) {
                  case 'Account': href = loc('/admin/login'); break;
                  case 'Anfrage': href = loc('/inquiry'); translatedLabel = t('contact'); break;
                  case 'Gutscheine': href = loc('/vouchers'); translatedLabel = t('vouchers'); break;
                  case 'Telefon': href = 'tel:+436765925596'; break;
                }
                return (
                  <Link
                    key={idx}
                    href={href}
                    className="flex items-center space-x-4 text-gray-900 text-xl font-light uppercase tracking-widest hover:text-gray-500 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{translatedLabel}</span>
                  </Link>
                )
              })}

              {/* Mobile Lang Switcher */}
              <div className="flex space-x-6 pt-4">
                <button
                  onClick={() => switchLanguage('de')}
                  className={`text-lg uppercase tracking-widest hover:text-gray-500 transition-colors ${currentLocale === 'de' ? 'font-bold' : 'font-light'}`}
                >
                  DE
                </button>
                <button
                  onClick={() => switchLanguage('en')}
                  className={`text-lg uppercase tracking-widest hover:text-gray-500 transition-colors ${currentLocale === 'en' ? 'font-bold' : 'font-light'}`}
                >
                  ENG
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}