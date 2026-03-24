import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "../globals.css";
import "react-day-picker/dist/style.css";
// Pfade auf relative Pfade angepasst, da dein components-Ordner im app-Ordner liegt
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

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

export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  
  // Important for static rendering to understand which locale dictionary to load
  setRequestLocale(locale);
  
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans bg-white text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ClientLayoutWrapper>
            <main className="relative z-10">
              {children}
            </main>
          </ClientLayoutWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// Trigger Vercel Deploy (Force Sync)