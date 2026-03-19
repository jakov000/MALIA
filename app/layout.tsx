import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import "react-day-picker/dist/style.css";
// Pfade auf relative Pfade angepasst, da dein components-Ordner im app-Ordner liegt
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

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
        
        <ClientLayoutWrapper>
          <main className="relative z-10">
            {children}
          </main>
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}