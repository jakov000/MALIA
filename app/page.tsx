import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';


export default function Home() {
  return (
    <main className="min-h-screen bg-[#fcfaf8]"> {/* Leichtes Off-White für Luxus-Look */}
      <Navbar />

      
      
      {/* Hero Section */}
      <Hero />
    </main>
  );
}