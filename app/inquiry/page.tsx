"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InquiryPage() {
    const [formData, setFormData] = useState({
        title: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        room: '',
        adults: 2,
        children: 0,
        checkIn: '',
        checkOut: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                alert('Fehler beim Senden der Anfrage.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ein Fehler ist aufgetreten.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-stone-50 pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-bold block mb-4">Kontakt</span>
                    <h1 className="text-4xl md:text-6xl font-serif text-stone-800 uppercase tracking-widest">Deine Anfrage</h1>
                    <div className="w-[1px] h-12 bg-stone-300 mx-auto mt-8" />
                </motion.div>

                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-12 text-center shadow-sm border border-stone-100 max-w-2xl mx-auto"
                    >
                        <h2 className="text-2xl font-serif text-stone-800 mb-6 uppercase tracking-widest">Vielen Dank!</h2>
                        <p className="text-gray-600 font-light mb-8">Wir haben deine Anfrage erhalten und melden uns in Kürze bei dir.</p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="px-8 py-3 bg-stone-800 text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-stone-700 transition-all"
                        >
                            Neue Anfrage
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        onSubmit={handleSubmit}
                        className="space-y-16 bg-white p-8 md:p-16 shadow-sm border border-stone-100"
                    >
                        {/* 1. Buchungsdetails */}
                        <div className="space-y-8">
                            <h2 className="text-xl font-serif text-stone-400 font-light border-b border-stone-100 pb-4">Buchungsdetails</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Anrede *</label>
                                    <select
                                        name="title"
                                        required
                                        className="w-full bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                    >
                                        <option value="">Bitte wählen</option>
                                        <option value="Herr">Herr</option>
                                        <option value="Frau">Frau</option>
                                        <option value="Divers">Divers</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Titel</label>
                                    <input
                                        type="text"
                                        name="title"
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Vorname *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Nachname *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Telefonnummer</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">E-Mail-Adresse *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Reisedaten */}
                        <div className="space-y-8">
                            <h2 className="text-xl font-serif text-stone-400 font-light border-b border-stone-100 pb-4">Reisedaten</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Welches Apartment wünschst du?</label>
                                    <select
                                        name="room"
                                        onChange={handleChange}
                                        className="w-full md:w-1/2 bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                    >
                                        <option value="">Bitte auswählen</option>
                                        <option value="Zimmer 1">Zimmer 1 (The Hideaway)</option>
                                        <option value="Zimmer 2">Zimmer 2 (The Residence)</option>
                                        <option value="Zimmer 3">Zimmer 3 (The Retreat)</option>
                                        <option value="Zimmer 4">Zimmer 4 (Alpine Loft)</option>
                                        <option value="Zimmer 5">Zimmer 5 (Summit Loft)</option>
                                    </select>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <div className="w-full md:w-auto">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Erwachsene</label>
                                        <select
                                            name="adults"
                                            onChange={handleChange}
                                            className="w-full md:w-40 bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} Erwachsene</option>)}
                                        </select>
                                    </div>
                                    <div className="w-full md:w-auto">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Kinder</label>
                                        <select
                                            name="children"
                                            onChange={handleChange}
                                            className="w-full md:w-40 bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                        >
                                            {[0, 1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Kinder</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button type="button" className="text-[10px] uppercase tracking-widest font-bold text-stone-800 flex items-center gap-2 hover:text-stone-500 transition-colors">
                                        <span>+</span> Zimmer hinzufügen
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6 pt-8">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Welchen Aufenthaltszeitraum möchtest du anfragen?</label>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex-1 min-w-[140px]">
                                        <label className="text-[9px] uppercase tracking-widest text-gray-400 block mb-1">Anreise *</label>
                                        <input
                                            type="date"
                                            name="checkIn"
                                            required
                                            onChange={handleChange}
                                            className="w-full bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors uppercase"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-[140px]">
                                        <label className="text-[9px] uppercase tracking-widest text-gray-400 block mb-1">Abreise *</label>
                                        <input
                                            type="date"
                                            name="checkOut"
                                            required
                                            onChange={handleChange}
                                            className="w-full bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors uppercase"
                                        />
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <button type="button" className="text-[10px] uppercase tracking-widest font-bold text-stone-800 flex items-center gap-2 hover:text-stone-500 transition-colors">
                                        <span>+</span> alternatives Reisedatum hinzufügen
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 3. Wünsche */}
                        <div className="space-y-8">
                            <h2 className="text-xl font-serif text-stone-400 font-light border-b border-stone-100 pb-4">Wünsche</h2>
                            <textarea
                                name="message"
                                rows={6}
                                onChange={handleChange}
                                className="w-full bg-stone-50 border border-stone-200 p-4 text-sm focus:outline-none focus:border-stone-400 transition-colors resize-none"
                                placeholder="Hast du besondere Wünsche oder Fragen?"
                            />
                        </div>

                        <div className="space-y-6 pt-8 border-t border-stone-100">
                            <p className="text-[10px] text-gray-400 leading-relaxed">
                                Datenschutz: Wir verarbeiten Ihre Daten ausschließlich zur Bearbeitung Ihrer Anfrage oder Ihres Auftrags. Weitere Informationen zum Umgang mit personenbezogenen Daten finden Sie in unseren <a href="#" className="underline hover:text-stone-800">Datenschutzhinweisen</a>.
                            </p>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-12 py-4 bg-stone-800 text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-stone-700 transition-all shadow-md hover:shadow-lg"
                                >
                                    Absenden
                                </button>
                            </div>
                        </div>

                    </motion.form>
                )}
            </div>
        </div>
    );
}
