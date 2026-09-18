import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import { getFeaturedProperties } from '@/lib/queries';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const featured = await getFeaturedProperties(3);

  return (
    <>
      <Hero />

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-clay tracking-[0.2em] text-xs uppercase mb-3">Featured</p>
            <h2 className="font-serif text-4xl md:text-5xl text-ink">Recently listed</h2>
          </div>
          <Link
            href="/properties"
            className="hidden md:flex items-center gap-2 text-sm text-ink/70 hover:text-clay transition-colors"
          >
            View all properties <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featured.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>
      </section>

      <section className="bg-sand py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
              alt="Interior design detail"
              className="rounded-2xl w-full h-[480px] object-cover"
            />
          </div>
          <div>
            <p className="text-clay tracking-[0.2em] text-xs uppercase mb-3">Our approach</p>
            <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-6">
              We don&rsquo;t list houses. We introduce you to homes.
            </h2>
            <p className="text-ink/70 leading-relaxed mb-6">
              Every property on Havenfield is visited and vetted in person by our team before it reaches you.
              We look past square footage &mdash; at light, at quiet, at the feeling of arriving somewhere that fits.
            </p>
            <Link
              href="/contact"
              // className="inline-flex items-center gap-2 bg-ink text-cream px-6 py-3 rounded-full hover:bg-clay transition-colors text-sm"
                className="inline-flex items-center gap-2 bg-clay text-cream px-6 py-3 rounded-full hover:bg-clay/90 transition-colors text-sm"
            >
              Work with us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 text-center">
        <p className="text-clay tracking-[0.2em] text-xs uppercase mb-3">Ready when you are</p>
        <h2 className="font-serif text-4xl md:text-6xl text-ink max-w-2xl mx-auto leading-tight mb-8">
          Let&rsquo;s find your next address.
        </h2>
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 border border-ink text-ink px-8 py-3.5 rounded-full hover:bg-ink hover:text-cream transition-colors text-sm"
        >
          Browse all properties <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </>
  );
}
