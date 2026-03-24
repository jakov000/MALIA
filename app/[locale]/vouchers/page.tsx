"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import SectionHeader from '@/components/ui/SectionHeader';
import PageFooter from '@/components/PageFooter';
import { useTranslations } from 'next-intl';

export default function VouchersPage() {
    const t = useTranslations('Vouchers');
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
                alert(t('alerts.error_send'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert(t('alerts.error_unexpected'));
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
                        title={t('hero.title')}
                        subtitle={t('hero.subtitle')}
                        description={t('hero.description')}
                    />
                </motion.div>

                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-12 text-center shadow-sm border border-stone-100 max-w-2xl mx-auto"
                    >
                        <h2 className="text-2xl font-serif text-stone-800 mb-6 uppercase tracking-widest">{t('success.title')}</h2>
                        <p className="text-gray-600 font-light mb-8">{t('success.message')}</p>
                        <Button onClick={() => setSubmitted(false)} variant="primary">
                            {t('success.button_new')}
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
                            <h2 className="text-xl font-serif text-stone-400 font-light border-b border-stone-100 pb-4">{t('form_personal.title')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">{t('form_personal.first_name')}</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">{t('form_personal.last_name')}</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">{t('form_personal.email')}</label>
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
                            <h2 className="text-xl font-serif text-stone-400 font-light border-b border-stone-100 pb-4">{t('form_details.title')}</h2>
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">{t('form_details.recipient')}</label>
                                    <input
                                        type="text"
                                        name="recipientName"
                                        required
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                        placeholder={t('form_details.recipient_placeholder')}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">{t('form_details.amount')}</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        required
                                        onChange={handleChange}
                                        className="w-full md:w-1/3 bg-stone-50 border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                        placeholder={t('form_details.amount_placeholder')}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">{t('form_details.message')}</label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-200 p-4 text-sm focus:outline-none focus:border-stone-400 transition-colors resize-none"
                                        placeholder={t('form_details.message_placeholder')}
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
                                {isSubmitting ? t('submit.loading') : t('submit.button')}
                            </button>
                        </div>
                    </motion.form>
                )}
            </div>
            <PageFooter />
        </div>
    );
}
