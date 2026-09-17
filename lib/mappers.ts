import type { Property as PrismaProperty } from '@prisma/client';

export type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  status: 'For Sale' | 'For Rent';
  type: 'House' | 'Apartment' | 'Villa' | 'Cabin';
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
};

// Converts a raw Prisma row (where gallery/features are JSON strings)
// into the clean Property shape the UI components already use.
export function toProperty(row: PrismaProperty): Property {
  return {
    id: row.slug,
    title: row.title,
    location: row.location,
    price: row.price,
    status: row.status as Property['status'],
    type: row.type as Property['type'],
    beds: row.beds,
    baths: row.baths,
    sqft: row.sqft,
    image: row.image,
    gallery: JSON.parse(row.gallery),
    description: row.description,
    features: JSON.parse(row.features),
  };
}

export function formatPrice(property: Property) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);
  return property.status === 'For Rent' ? `${formatted}/mo` : formatted;
}
