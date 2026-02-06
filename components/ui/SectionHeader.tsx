import React from 'react';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    centered?: boolean;
    light?: boolean;
}

export default function SectionHeader({
    title,
    subtitle,
    description,
    centered = true,
    light = false
}: SectionHeaderProps) {
    return (
        <div className={`max-w-4xl mx-auto ${centered ? 'text-center' : 'text-left'} mb-16 md:mb-24`}>
            {subtitle && (
                <span className={`text-[10px] uppercase tracking-[0.4em] font-bold block mb-4 ${light ? 'text-white/70' : 'text-[#7d3a2a]'}`}>
                    {subtitle}
                </span>
            )}

            <h2 className={`text-3xl md:text-5xl font-serif uppercase tracking-widest mb-8 leading-tight ${light ? 'text-white' : 'text-stone-800'}`}>
                {title}
            </h2>

            {description && (
                <p className={`text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto ${light ? 'text-white/80' : 'text-gray-600'}`}>
                    {description}
                </p>
            )}

            <div className={`w-[1px] h-12 mt-8 ${centered ? 'mx-auto' : ''} ${light ? 'bg-white/20' : 'bg-stone-300'}`} />
        </div>
    );
}
