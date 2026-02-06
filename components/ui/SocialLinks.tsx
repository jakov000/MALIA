import { Instagram, Facebook, Youtube } from 'lucide-react';

export default function SocialLinks({ className = "", iconSize = 20 }) {
    return (
        <div className={`flex gap-6 ${className}`}>
            <a href="#" className="hover:text-stone-400 transition-colors"><Instagram size={iconSize} strokeWidth={1} /></a>
            <a href="#" className="hover:text-stone-400 transition-colors"><Facebook size={iconSize} strokeWidth={1} /></a>
            <a href="#" className="hover:text-stone-400 transition-colors"><Youtube size={iconSize} strokeWidth={1} /></a>
        </div>
    );
}
