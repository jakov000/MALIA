import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { setRequestLocale } from 'next-intl/server';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  
  // Important for static rendering mapping 
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-[#fcfaf8]"> {/* Leichtes Off-White für Luxus-Look */}
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
    </main>
  );
}