import { getPropertyBySlug } from '@/lib/queries';
import { formatPrice } from '@/lib/mappers';
import { notFound } from 'next/navigation';
import PropertyGallery from '@/components/PropertyGallery';
import BookingCard from '@/components/BookingCard';
import { BedDouble, Bath, Ruler, MapPin, Check } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = await getPropertyBySlug(params.id);
  if (!property) return notFound();

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <PropertyGallery images={property.gallery} title={property.title} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mt-14">
          <div className="lg:col-span-2">
            <span className="inline-block bg-sand text-ink/70 text-xs tracking-wide uppercase px-3 py-1.5 rounded-full mb-4">
              {property.status}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">{property.title}</h1>
            <p className="flex items-center gap-1.5 text-ink/60 mb-8">
              <MapPin className="w-4 h-4" strokeWidth={1.5} /> {property.location}
            </p>

            <div className="flex flex-wrap gap-8 py-6 border-y border-sand mb-8 text-ink/80">
              <span className="flex items-center gap-2">
                <BedDouble className="w-5 h-5 text-clay" strokeWidth={1.5} /> {property.beds} Bedrooms
              </span>
              <span className="flex items-center gap-2">
                <Bath className="w-5 h-5 text-clay" strokeWidth={1.5} /> {property.baths} Bathrooms
              </span>
              <span className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-clay" strokeWidth={1.5} /> {property.sqft.toLocaleString()} sqft
              </span>
            </div>

            <h2 className="font-serif text-2xl text-ink mb-4">About this home</h2>
            <p className="text-ink/70 leading-relaxed mb-10">{property.description}</p>

            <h2 className="font-serif text-2xl text-ink mb-4">Features</h2>
            <ul className="grid grid-cols-2 gap-3">
              {property.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-ink/70 text-sm">
                  <Check className="w-4 h-4 text-moss shrink-0" strokeWidth={1.5} /> {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <BookingCard price={formatPrice(property)} propertyTitle={property.title} propertySlug={property.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
