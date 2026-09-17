'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden aspect-[16/9]">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 mt-4">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                active === i ? 'border-clay' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
