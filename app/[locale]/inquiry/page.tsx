"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function InquiryPage() {
    const t = useTranslations('Inquiry');
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
                alert(t('alert_error'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert(t('alert_general'));
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
                    <span className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-bold block mb-4">{t('contact')}</span>
                    <h1 className="text-4xl md:text-6xl font-serif text-stone-800 uppercase tracking-widest">{t('title')}</h1>
                    <div className="w-[1px] h-12 bg-stone-300 mx-auto mt-8" />
                </motion.div>

                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-12 text-center shadow-sm border border-stone-100 max-w-2xl mx-auto"
                    >
                        <h2 className="text-2xl font-serif text-stone-800 mb-6 uppercase tracking-widest">{t('success_title')}</h2>
                        <p className="text-gray-600 font-light mb-8">{t('success_text')}</p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="px-8 py-3 bg-stone-800 text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-stone-700 transition-all"
                        >
                            {t('new_inquiry')}
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
                            <h2 className="text-xl font-serif text-stone-400 font-light border-b border-stone-100 pb-4">{t('booking_details')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">{t('salutation')}</label>
                                    <select
                                        name="title"
                                        required
                                        className="w-full bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                    >
                                        <option value="">{t('please_select')}</option>
                                        <option value="Herr">{t('mr')}</option>
                                        <option value="Frau">{t('mrs')}</option>
                                        <option value="Divers">{t('diverse')}</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">{t('doc_title')}</label>
                                    <input
                                        type="text"
                                        name="title"
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">{t('firstname')}</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">{t('lastname')}</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">{t('phone')}</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">{t('email')}</label>
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
                            <h2 className="text-xl font-serif text-stone-400 font-light border-b border-stone-100 pb-4">{t('travel_dates')}</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">{t('which_apartment')}</label>
                                    <select
                                        name="room"
                                        onChange={handleChange}
                                        className="w-full md:w-1/2 bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                    >
                                        <option value="">{t('please_select')}</option>
                                        <option value="Zimmer 1">{t('room1')}</option>
                                        <option value="Zimmer 2">{t('room2')}</option>
                                        <option value="Zimmer 3">{t('room3')}</option>
                                        <option value="Zimmer 4">{t('room4')}</option>
                                        <option value="Zimmer 5">{t('room5')}</option>
                                    </select>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <div className="w-full md:w-auto">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">{t('adults')}</label>
                                        <select
                                            name="adults"
                                            onChange={handleChange}
                                            className="w-full md:w-40 bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} {t('adults')}</option>)}
                                        </select>
                                    </div>
                                    <div className="w-full md:w-auto">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">{t('children')}</label>
                                        <select
                                            name="children"
                                            onChange={handleChange}
                                            className="w-full md:w-40 bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                        >
                                            {[0, 1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} {t('children')}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button type="button" className="text-[10px] uppercase tracking-widest font-bold text-stone-800 flex items-center gap-2 hover:text-stone-500 transition-colors">
                                        <span>+</span> {t('add_room')}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6 pt-8">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">{t('which_duration')}</label>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex-1 min-w-[140px]">
                                        <label className="text-[9px] uppercase tracking-widest text-gray-400 block mb-1">{t('checkin')}</label>
                                        <input
                                            type="date"
                                            name="checkIn"
                                            required
                                            onChange={handleChange}
                                            className="w-full bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors uppercase"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-[140px]">
                                        <label className="text-[9px] uppercase tracking-widest text-gray-400 block mb-1">{t('checkout')}</label>
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
                                        <span>+</span> {t('add_date')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 3. Wünsche */}
                        <div className="space-y-8">
                            <h2 className="text-xl font-serif text-stone-400 font-light border-b border-stone-100 pb-4">{t('wishes_title')}</h2>
                            <textarea
                                name="message"
                                rows={6}
                                onChange={handleChange}
                                className="w-full bg-stone-50 border border-stone-200 p-4 text-sm focus:outline-none focus:border-stone-400 transition-colors resize-none"
                                placeholder={t('wishes_placeholder')}
                            />
                        </div>

                        <div className="space-y-6 pt-8 border-t border-stone-100">
                            <p className="text-[10px] text-gray-400 leading-relaxed">
                                {t.rich('privacy_notice', { link: (chunks) => <a href="/datenschutz" className="underline hover:text-stone-800">{chunks}</a> })}
                            </p>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-12 py-4 bg-stone-800 text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-stone-700 transition-all shadow-md hover:shadow-lg"
                                >
                                    {t('submit')}
                                </button>
                            </div>
                        </div>

                    </motion.form>
                )}
            </div>
        </div>
    );
}
