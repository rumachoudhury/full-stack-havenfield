'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BedDouble, Bath, Ruler } from 'lucide-react';
import { Property, formatPrice } from '@/lib/mappers';

export default function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
    >
      <Link href={`/properties/${property.id}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <span className="absolute top-4 left-4 bg-cream/90 text-ink text-xs tracking-wide uppercase px-3 py-1.5 rounded-full">
            {property.status}
          </span>
          <div className="absolute bottom-0 left-0 right-0 p-5 text-cream">
            <p className="font-serif text-2xl">{formatPrice(property)}</p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-serif text-xl text-ink group-hover:text-clay transition-colors">{property.title}</h3>
          <p className="text-ink/60 text-sm mt-1">{property.location}</p>
          <div className="flex items-center gap-4 mt-3 text-ink/70 text-sm">
            <span className="flex items-center gap-1.5">
              <BedDouble className="w-4 h-4" strokeWidth={1.5} /> {property.beds}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4" strokeWidth={1.5} /> {property.baths}
            </span>
            <span className="flex items-center gap-1.5">
              <Ruler className="w-4 h-4" strokeWidth={1.5} /> {property.sqft.toLocaleString()} sqft
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
