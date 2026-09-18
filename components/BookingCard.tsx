'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';

export default function BookingCard({
  price,
  propertyTitle,
  propertySlug,
}: {
  price: string;
  propertyTitle: string;
  propertySlug: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', date: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          tourDate: form.date,
          propertySlug,
          message: `Tour request for ${propertyTitle}`,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong — please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="sticky top-28 bg-white border border-sand rounded-2xl p-7 shadow-sm"
    >
      <p className="font-serif text-3xl text-ink mb-1">{price}</p>
      <p className="text-ink/50 text-sm mb-6">Schedule a private tour</p>

      {submitted ? (
        <div className="flex flex-col items-center text-center py-6">
          <CalendarCheck className="w-8 h-8 text-moss mb-3" strokeWidth={1.5} />
          <p className="text-ink font-medium">Request sent</p>
          <p className="text-ink/60 text-sm mt-1">We&rsquo;ll be in touch shortly to confirm your tour.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            required
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-sand rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-clay"
          />
          <input
            required
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-sand rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-clay"
          />
          <input
            required
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border border-sand rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-clay"
          />
          <button
            type="submit"
            className="w-full bg-clay text-cream rounded-lg py-3 text-sm hover:bg-clay/90 transition-colors"
          >
            Request a Tour
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      )}
    </motion.div>
  );
}
