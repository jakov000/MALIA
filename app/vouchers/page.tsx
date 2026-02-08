"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import SectionHeader from '@/components/ui/SectionHeader';
import PageFooter from '@/components/PageFooter';

export default function VouchersPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        recipientName: '',
        amount: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/voucher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                alert('Fehler beim Senden der Anfrage. Bitte versuche es später erneut.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ein Fehler ist aufgetreten.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                    <SectionHeader
                        title="Gutschein Schenken"
                        subtitle="Eine Freude bereiten"
                        description="Verschenke Zeit im MALIA. Ob für einen Aufenthalt, ein Frühstück oder einfach als Wertgutschein – wir erstellen dir gerne einen persönlichen Gutschein."
                    />
                </motion.div>

                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-12 text-center shadow-sm border border-stone-100 max-w-2xl mx-auto"
                    >
                        <h2 className="text-2xl font-serif text-stone-800 mb-6 uppercase tracking-widest">Vielen Dank!</h2>
                        <p className="text-gray-600 font-light mb-8">Deine Gutschein-Anfrage ist bei uns eingegangen. Wir werden sie so schnell wie möglich bearbeiten und uns bei dir melden.</p>
                        <Button onClick={() => setSubmitted(false)} variant="primary">
                            Neue Anfrage
                        </Button>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        onSubmit={handleSubmit}
                        className="space-y-12 bg-white p-8 md:p-16 shadow-sm border border-stone-100"
                    >
                        {/* 1. Deine Daten */}
                        <div className="space-y-8">
                            <h2 className="text-xl font-serif text-stone-400 font-light border-b border-stone-100 pb-4">Deine Daten</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
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
                                <div className="space-y-1 md:col-span-2">
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

                        {/* 2. Gutschein Details */}
                        <div className="space-y-8">
                            <h2 className="text-xl font-serif text-stone-400 font-light border-b border-stone-100 pb-4">Gutschein Details</h2>
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Für wen ist der Gutschein? (Name) *</label>
                                    <input
                                        type="text"
                                        name="recipientName"
                                        required
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                        placeholder="z.B. Max Mustermann"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Betrag in Euro *</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        required
                                        onChange={handleChange}
                                        className="w-full md:w-1/3 bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                        placeholder="z.B. 150"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Persönliche Nachricht (optional)</label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-200 p-4 text-sm focus:outline-none focus:border-stone-400 transition-colors resize-none"
                                        placeholder="Dein Text auf dem Gutschein..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-8 border-t border-stone-100">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-12 py-4 bg-stone-800 text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-stone-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Wird gesendet...' : 'Anfrage Absenden'}
                            </button>
                        </div>
                    </motion.form>
                )}
            </div>
            <PageFooter />
        </div>
    );
}
