import { Instagram, Facebook } from 'lucide-react';

export default function SocialLinks({ className = "", iconSize = 20 }) {
    return (
        <div className={`flex gap-6 ${className}`}>
            <a href="https://www.instagram.com/malia.alpine.hideaway?utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-stone-400 transition-colors"><Instagram size={iconSize} strokeWidth={1} /></a>
            <a href="https://www.facebook.com/people/MALIA-Alpine-Hideaway/61582954802618/" target="_blank" rel="noopener noreferrer" className="hover:text-stone-400 transition-colors"><Facebook size={iconSize} strokeWidth={1} /></a>
        </div>
    );
}
