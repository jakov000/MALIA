import React from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';

export default function PageFooter() {
    return (
        <footer className="bg-[#f8f6f3] pt-24 pb-32 px-6">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 text-[9px] md:text-[11px] uppercase tracking-[0.25em] text-gray-500 font-sans text-center">
                    {["FAQ", "Anreise", "Inklusivleistungen", "Impressum", "Datenschutz"].map((link) => (
                        <span key={link} className="hover:text-black cursor-pointer transition-colors">{link}</span>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
                    <div className="flex items-center gap-8 text-gray-800">
                        <a href="https://www.instagram.com/malia.alpine.hideaway/" target="_blank" rel="noopener noreferrer">
                            <Instagram size={18} strokeWidth={1.5} className="cursor-pointer hover:scale-110 transition-transform" />
                        </a>
                        <a href="https://www.facebook.com/people/MALIA-Alpine-Hideaway/61582954802618/" target="_blank" rel="noopener noreferrer">
                            <Facebook size={18} strokeWidth={1.5} className="cursor-pointer hover:scale-110 transition-transform" />
                        </a>
                        <Youtube size={18} strokeWidth={1.5} className="cursor-pointer hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold cursor-pointer hover:text-black">SPOTIFY</span>
                    </div>
                    <button className="px-10 py-3 border border-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all shadow-sm">
                        Sign up for inspiration
                    </button>
                </div>

                <div className="text-center text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans leading-loose">
                    <p>MALIA Alpine Hideaway — Familie Madleine & Julia — Ländbergstraße 6 — 6213 Pertisau</p>
                    <p className="mt-2 text-gray-500 font-medium">hello@malia-hideaway.at</p>
                </div>
            </div>
        </footer>
    );
}
