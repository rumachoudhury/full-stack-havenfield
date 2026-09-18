'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Properties' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      // className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      //   scrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm' : 'bg-transparent' 
      // }`}
className="fixed top-0 left-0 right-0 z-50 bg-black text-white"


    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-2 group">
          <Home className="w-5 h-5 text-clay" strokeWidth={1.5} />
          <span className="font-serif text-2xl tracking-wide text-white">Havenfield</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              // className="text-sm tracking-wide text-ink/80 hover:text-clay transition-colors"
                className="text-white hover:text-gray-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            // className="text-sm tracking-wide bg-ink text-cream px-5 py-2.5 rounded-full hover:bg-clay transition-colors"
                        className="text-sm tracking-wide bg-clay text-cream px-5 py-2.5 rounded-full hover:bg-clay/90 transition-colors"

          >
            Book a Tour
          </Link>
        </nav>

        <button className="md:hidden text-ink" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-cream border-t border-sand"
        >
          <div className="flex flex-col px-6 py-4 gap-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-ink/80 text-lg">
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
