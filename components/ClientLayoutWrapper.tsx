"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ConsentProvider from "./analytics/ConsentProvider";
import CookieBanner from "./analytics/CookieBanner";
import GoogleAnalytics from "./analytics/GoogleAnalytics";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <ConsentProvider>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}

      {/* Banner und Messung nur im öffentlichen Bereich. Google Analytics
          lädt ausschliesslich nach ausdrücklicher Einwilligung. */}
      {!isAdmin && <CookieBanner />}
      {!isAdmin && <GoogleAnalytics />}
    </ConsentProvider>
  );
}
