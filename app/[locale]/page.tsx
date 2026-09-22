import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/page-metadata';
import JsonLd from '@/components/JsonLd';
import { lodgingBusinessSchema, organizationSchema } from '@/lib/schema';
import { isLocale, DEFAULT_LOCALE } from '@/lib/seo';

export const generateMetadata = pageMetadata('home', '');

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  // Important for static rendering mapping
  setRequestLocale(locale);

  const schemaLocale = isLocale(locale) ? locale : DEFAULT_LOCALE;

  return (
    <main className="min-h-screen bg-[#fcfaf8]"> {/* Leichtes Off-White für Luxus-Look */}
      <JsonLd data={[lodgingBusinessSchema(schemaLocale), organizationSchema(schemaLocale)]} />
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
    </main>
  );
}