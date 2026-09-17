import Link from 'next/link';
import { Home, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/80 mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Home className="w-5 h-5 text-clay" strokeWidth={1.5} />
            <span className="font-serif text-2xl text-cream">Havenfield</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed">
            A curated real estate studio finding thoughtfully designed homes for people who care where they live.
          </p>
        </div>

        <div>
          <h4 className="text-cream text-sm tracking-wide uppercase mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/properties" className="hover:text-clay transition-colors">All Properties</Link></li>
            <li><Link href="/properties?status=For Sale" className="hover:text-clay transition-colors">For Sale</Link></li>
            <li><Link href="/properties?status=For Rent" className="hover:text-clay transition-colors">For Rent</Link></li>
            <li><Link href="/contact" className="hover:text-clay transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-cream text-sm tracking-wide uppercase mb-4">Follow</h4>
          <div className="flex gap-4">
            <Instagram className="w-5 h-5 hover:text-clay transition-colors cursor-pointer" strokeWidth={1.5} />
            <Facebook className="w-5 h-5 hover:text-clay transition-colors cursor-pointer" strokeWidth={1.5} />
            <Twitter className="w-5 h-5 hover:text-clay transition-colors cursor-pointer" strokeWidth={1.5} />
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10 py-6 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Havenfield. All rights reserved.
      </div>
    </footer>
  );
}
