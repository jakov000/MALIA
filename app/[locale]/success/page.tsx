"use client";

import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SuccessPage() {
  const t = useTranslations("SuccessPage");

  return (
    <div className="bg-stone-50 min-h-screen font-sans flex flex-col">
      <Navbar />
      
      <div className="h-24 md:h-32 bg-white" />

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-10 md:p-16 text-center max-w-lg shadow-xl border border-stone-100 rounded-lg">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-serif text-stone-900 uppercase tracking-widest mb-4">
            {t("title")}
          </h1>
          <p className="text-stone-600 font-light mb-8">
            {t("description")}
          </p>
          
          <Link href="/">
            <span className="inline-block bg-[#bcc2b2] text-stone-800 px-8 py-3 uppercase tracking-widest font-bold text-xs hover:bg-[#b0b8a5] transition-colors">
              {t("button")}
            </span>
          </Link>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}
