import type { Metadata } from 'next';
import { Playfair_Display, Inter } from "next/font/google";
import '../globals.css'; 

const serif = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif" 
});
const sans = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

export const metadata: Metadata = {
  title: "Admin Dashboard - MALIA",
  description: "Internes Verwaltungssystem",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased text-gray-900 bg-stone-50 min-h-screen">
         {children}
      </body>
    </html>
  );
}
