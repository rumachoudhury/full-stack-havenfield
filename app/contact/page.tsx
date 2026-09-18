'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong — please try again.');
    }
  };

  return (
    <div className="pt-36 pb-24 max-w-7xl mx-auto px-6 md:px-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="text-clay tracking-[0.2em] text-xs uppercase mb-3">Get in touch</p>
        <h1 className="font-serif text-5xl md:text-6xl text-ink mb-14">Let&rsquo;s talk homes.</h1>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-ink/70 leading-relaxed mb-10 max-w-md">
            Whether you&rsquo;re buying, selling, or just curious what&rsquo;s out there, our team responds within one
            business day. No pressure, just good advice.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-clay" strokeWidth={1.5} />
              </div>
              <span className="text-ink/80">hello@havenfield.example</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-clay" strokeWidth={1.5} />
              </div>
              <span className="text-ink/80">(555) 010-2938</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-clay" strokeWidth={1.5} />
              </div>
              <span className="text-ink/80">142 Hollow Ridge Rd, Hudson, NY</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white border border-sand rounded-2xl p-8"
        >
          {submitted ? (
            <div className="text-center py-10">
              <p className="font-serif text-2xl text-ink mb-2">Message sent</p>
              <p className="text-ink/60 text-sm">Thanks for reaching out &mdash; we&rsquo;ll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-sand rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-clay"
              />
              <input
                required
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-sand rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-clay"
              />
              <textarea
                required
                rows={5}
                placeholder="Tell us what you're looking for..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-sand rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-clay resize-none"
              />
              {/* <button
                type="submit"
                className="w-full bg-ink text-cream rounded-lg py-3.5 text-sm hover:bg-clay transition-colors"
              >
                Send Message
              </button> */}

              <button
                type="submit"
                className="w-full bg-clay text-cream rounded-lg py-3.5 text-sm hover:bg-clay/90 transition-colors"
              >
                Send Message
              </button>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
