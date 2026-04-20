import React from 'react';

interface SectionHeaderProps {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    description?: React.ReactNode;
    centered?: boolean;
    light?: boolean;
    uppercaseTitle?: boolean;
}

export default function SectionHeader({
    title,
    subtitle,
    description,
    centered = true,
    light = false,
    uppercaseTitle = true
}: SectionHeaderProps) {
    return (
        <div className={`max-w-4xl mx-auto ${centered ? 'text-center' : 'text-left'} mb-8 md:mb-12`}>
            {subtitle && (
                <span className={`text-[10px] uppercase tracking-[0.4em] font-bold block mb-4 ${light ? 'text-white/70' : 'text-[#3d3d29]'}`}>
                    {subtitle}
                </span>
            )}

            <h2 className={`text-3xl md:text-5xl font-serif ${uppercaseTitle ? 'uppercase' : ''} lining-nums tracking-widest mb-8 leading-tight ${light ? 'text-white' : 'text-stone-800'}`}>
                {title}
            </h2>

            {description && (
                <div className={`text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto ${light ? 'text-white/80' : 'text-gray-600'}`}>
                    {description}
                </div>
            )}

            <div className={`w-[1px] h-12 mt-8 ${centered ? 'mx-auto' : ''} ${light ? 'bg-white/20' : 'bg-stone-300'}`} />
        </div>
    );
}
