import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { toProperty } from '@/lib/mappers';

// GET /api/properties — list all properties
export async function GET() {
  const rows = await prisma.property.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(rows.map(toProperty));
}

// POST /api/properties — create a new property
// Body: { title, location, price, status, type, beds, baths, sqft, image, gallery: string[], description, features: string[], slug }
export async function POST(req: NextRequest) {
  const body = await req.json();

  const required = ['slug', 'title', 'location', 'price', 'status', 'type', 'beds', 'baths', 'sqft', 'image'];
  for (const field of required) {
    if (body[field] === undefined || body[field] === null || body[field] === '') {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  try {
    const created = await prisma.property.create({
      data: {
        slug: body.slug,
        title: body.title,
        location: body.location,
        price: Number(body.price),
        status: body.status,
        type: body.type,
        beds: Number(body.beds),
        baths: Number(body.baths),
        sqft: Number(body.sqft),
        image: body.image,
        gallery: JSON.stringify(body.gallery ?? [body.image]),
        description: body.description ?? '',
        features: JSON.stringify(body.features ?? []),
      },
    });
    return NextResponse.json(toProperty(created), { status: 201 });
  } catch (err: any) {
    if (err.code === 'P2002') {
      return NextResponse.json({ error: 'A property with that slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}
