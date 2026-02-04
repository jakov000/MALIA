import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
// Pfade auf relative Pfade angepasst, da dein components-Ordner im app-Ordner liegt
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

// Die Schriftarten für den Forsthofgut-Look
const serif = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif" 
});
const sans = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

export const metadata: Metadata = {
  title: "MALIA Alpine Hideaway - Luxus in den Alpen",
  description: "Erleben Sie Luxus pur in unserer Villa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans bg-white text-gray-900 antialiased">
        
        {/* Die Navbar ist immer oben fixiert */}
        <Navbar />

        {/* Der Hauptinhalt der Seite. 
            Das z-10 sorgt dafür, dass der Content über dem Hintergrund bleibt.
        */}
        <main className="relative z-10">
          {children}
        </main>

        {/* DER PUFFER WURDE ENTFERNT. 
            Die weiße Fläche ist nun weg. Der Abschluss der Seite wird 
            jetzt allein durch den Inhalt in deiner page.tsx/Hero.tsx bestimmt.
        */}

        {/* Der Sticky-Footer (die schmale Leiste) ist immer am unteren Rand fixiert */}
        <Footer />
        
      </body>
    </html>
  );
}