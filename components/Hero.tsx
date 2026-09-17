'use client';

import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query ? `/properties?q=${encodeURIComponent(query)}` : '/properties');
  };

  return (
    <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2400&auto=format&fit=crop"
          alt="Modern estate at golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/70" />
      </motion.div>

      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-center items-start">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-cream/80 tracking-[0.3em] text-xs md:text-sm uppercase mb-4"
        >
          Curated homes, quietly extraordinary
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-serif text-cream text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-3xl"
        >
          Find a place that feels like home.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="text-cream/85 mt-6 max-w-lg text-lg"
        >
          A hand-picked collection of houses, lofts, and getaways across the country &mdash; for buying, renting, or simply dreaming.
        </motion.p>

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-10 w-full max-w-xl bg-cream/95 rounded-full p-1.5 flex items-center shadow-xl"
        >
          <MapPin className="w-5 h-5 text-clay ml-4 shrink-0" strokeWidth={1.5} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city, neighborhood, or property name"
            className="flex-1 bg-transparent px-3 py-3 text-ink placeholder:text-ink/40 focus:outline-none text-sm md:text-base"
          />
          <button
            type="submit"
            className="bg-ink text-cream rounded-full px-5 md:px-7 py-3 flex items-center gap-2 hover:bg-clay transition-colors shrink-0"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Search</span>
          </button>
        </motion.form>
      </div>
    </section>
  );
}
