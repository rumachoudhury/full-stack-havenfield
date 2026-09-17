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

export const properties: Property[] = [
  {
    id: 'birchwood-estate',
    title: 'Birchwood Estate',
    location: 'Hudson Valley, NY',
    price: 2450000,
    status: 'For Sale',
    type: 'House',
    beds: 5,
    baths: 4,
    sqft: 4200,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
    ],
    description:
      'A restored farmhouse set among century-old birch trees, blending original timber framing with a quietly modern interior. Wide-plank floors, a chef\u2019s kitchen, and a wraparound porch overlook 12 private acres.',
    features: ['12 acres', 'Wraparound porch', 'Chef\u2019s kitchen', 'Heated barn studio', 'Private pond'],
  },
  {
    id: 'the-marlowe-loft',
    title: 'The Marlowe Loft',
    location: 'Brooklyn, NY',
    price: 6800,
    status: 'For Rent',
    type: 'Apartment',
    beds: 2,
    baths: 2,
    sqft: 1450,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1600&auto=format&fit=crop',
    ],
    description:
      'An industrial-era loft with 12-foot ceilings, exposed brick, and steel-framed windows facing the Manhattan skyline. Fully renovated with an open kitchen and custom millwork throughout.',
    features: ['12ft ceilings', 'Skyline views', 'Exposed brick', 'In-unit laundry', 'Rooftop access'],
  },
  {
    id: 'casa-del-sol',
    title: 'Casa del Sol',
    location: 'Ojai, CA',
    price: 3200000,
    status: 'For Sale',
    type: 'Villa',
    beds: 4,
    baths: 5,
    sqft: 3800,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop',
    ],
    description:
      'A sun-drenched Spanish revival villa terraced into the hillside, with citrus groves, a mosaic-tiled pool, and arched breezeways framing views of the valley below.',
    features: ['Mosaic pool', 'Citrus grove', 'Arched breezeways', 'Guest casita', 'Outdoor kitchen'],
  },
  {
    id: 'pinecrest-cabin',
    title: 'Pinecrest Cabin',
    location: 'Lake Tahoe, CA',
    price: 890000,
    status: 'For Sale',
    type: 'Cabin',
    beds: 3,
    baths: 2,
    sqft: 1900,
    image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1600&auto=format&fit=crop',
    ],
    description:
      'A timber-frame cabin tucked into the pines a short walk from the lakeshore, with a double-height stone fireplace and a screened porch built for slow mornings.',
    features: ['Stone fireplace', 'Screened porch', 'Lake access', 'Radiant floor heat', 'Detached workshop'],
  },
  {
    id: 'harborline-residence',
    title: 'Harborline Residence',
    location: 'Newport, RI',
    price: 4100000,
    status: 'For Sale',
    type: 'House',
    beds: 6,
    baths: 5,
    sqft: 5100,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop',
    ],
    description:
      'A shingle-style waterfront residence with private dock access, wraparound decks, and unobstructed harbor views from nearly every room.',
    features: ['Private dock', 'Harbor views', 'Wraparound deck', 'Wine cellar', 'Guest suite'],
  },
  {
    id: 'the-aldridge',
    title: 'The Aldridge',
    location: 'Chicago, IL',
    price: 4500,
    status: 'For Rent',
    type: 'Apartment',
    beds: 1,
    baths: 1,
    sqft: 950,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?q=80&w=1600&auto=format&fit=crop',
    ],
    description:
      'A pre-war one-bedroom with restored crown molding and herringbone floors, updated with a sleek kitchen and spa-style bath, steps from the river.',
    features: ['Herringbone floors', 'River views', 'Spa bath', 'Concierge building', 'Gym access'],
  },
];

export function getPropertyById(id: string) {
  return properties.find((p) => p.id === id);
}

export function formatPrice(property: Property) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);
  return property.status === 'For Rent' ? `${formatted}/mo` : formatted;
}
