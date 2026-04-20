"use client";

import { useState } from "react";
import { LogOut, CalendarRange, Ticket, Calendar as CalIcon, Settings } from "lucide-react";
import { signOut } from "next-auth/react";

// Placeholder components that we will build next
import BookingsTable from "@/components/admin/BookingsTable";
import VoucherManager from "@/components/admin/VoucherManager";
import AdminCalendar from "@/components/admin/AdminCalendar";
import SettingsPanel from "@/components/admin/SettingsPanel";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"bookings" | "vouchers" | "calendar" | "settings">("bookings");

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#3d3d29] text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-serif tracking-widest uppercase">Malia - Alpine Hideaway</h2>
          <span className="text-xs text-stone-400 uppercase tracking-widest font-bold block mt-1">Admin Portal</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-8">
          <button 
            onClick={() => setActiveTab("bookings")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${activeTab === "bookings" ? "bg-stone-800 text-white" : "text-stone-400 hover:bg-stone-800 hover:text-white"}`}
          >
            <CalendarRange size={20} />
            <span>Buchungen</span>
          </button>

          <button 
            onClick={() => setActiveTab("calendar")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${activeTab === "calendar" ? "bg-stone-800 text-white" : "text-stone-400 hover:bg-stone-800 hover:text-white"}`}
          >
            <CalIcon size={20} />
            <span>Kalender Sperren</span>
          </button>

          <button 
            onClick={() => setActiveTab("vouchers")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${activeTab === "vouchers" ? "bg-stone-800 text-white" : "text-stone-400 hover:bg-stone-800 hover:text-white"}`}
          >
            <Ticket size={20} />
            <span>Gutscheine</span>
          </button>

          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${activeTab === "settings" ? "bg-stone-800 text-white" : "text-stone-400 hover:bg-stone-800 hover:text-white"}`}
          >
            <Settings size={20} />
            <span>Einstellungen</span>
          </button>
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center justify-center space-x-2 bg-stone-800 hover:bg-stone-700 text-white py-3 rounded-md transition-colors text-sm"
          >
            <LogOut size={16} />
            <span>Abmelden</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === "bookings" && <BookingsTable />}
          {activeTab === "calendar" && <AdminCalendar />}
          {activeTab === "vouchers" && <VoucherManager />}
          {activeTab === "settings" && <SettingsPanel />}
        </div>
      </main>

    </div>
  );
}
