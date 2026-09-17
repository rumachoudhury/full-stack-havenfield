'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/PropertyCard';
import type { Property } from '@/lib/mappers';

const statuses = ['All', 'For Sale', 'For Rent'] as const;
const types = ['All', 'House', 'Apartment', 'Villa', 'Cabin'] as const;

export default function PropertiesClient({ properties }: { properties: Property[] }) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const initialStatus = (searchParams.get('status') as (typeof statuses)[number]) ?? 'All';

  const [query, setQuery] = useState(initialQuery);
  const [status, setStatus] = useState<(typeof statuses)[number]>(
    statuses.includes(initialStatus) ? initialStatus : 'All'
  );
  const [type, setType] = useState<(typeof types)[number]>('All');

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const matchesQuery =
        query.trim() === '' ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'All' || p.status === status;
      const matchesType = type === 'All' || p.type === type;
      return matchesQuery && matchesStatus && matchesType;
    });
  }, [query, status, type]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 pt-36 pb-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="text-clay tracking-[0.2em] text-xs uppercase mb-3">Listings</p>
        <h1 className="font-serif text-5xl md:text-6xl text-ink mb-10">All Properties</h1>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center mb-14">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or location..."
          className="flex-1 bg-white border border-sand rounded-full px-5 py-3 text-sm focus:outline-none focus:border-clay"
        />

        <div className="flex gap-3 overflow-x-auto">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm border transition-colors ${
                status === s ? 'bg-ink text-cream border-ink' : 'border-sand text-ink/70 hover:border-clay'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex gap-3 overflow-x-auto">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm border transition-colors ${
                type === t ? 'bg-clay text-cream border-clay' : 'border-sand text-ink/70 hover:border-clay'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-ink/60 text-center py-20">No properties match your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {filtered.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
