import React from 'react';
import Link from 'next/link';

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'outline' | 'white' | 'glass';
    className?: string;
    target?: string;
}

export default function Button({
    children,
    href,
    onClick,
    variant = 'primary',
    className = '',
    target
}: ButtonProps) {

    const baseStyles = "inline-block px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 text-center cursor-pointer";

    const variants = {
        primary: "bg-stone-800 text-white hover:bg-stone-700 hover:shadow-lg",
        outline: "border border-stone-200 text-stone-800 hover:bg-stone-50 hover:border-stone-300",
        white: "bg-white text-stone-900 hover:bg-stone-100 hover:shadow-md",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClassName} target={target}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={combinedClassName}>
            {children}
        </button>
    );
}
