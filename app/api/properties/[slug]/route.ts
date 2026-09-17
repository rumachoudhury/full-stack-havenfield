import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { toProperty } from '@/lib/mappers';

// GET /api/properties/[slug]
export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const row = await prisma.property.findUnique({ where: { slug: params.slug } });
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(toProperty(row));
}

// PATCH /api/properties/[slug] — partial update
export async function PATCH(req: NextRequest, { params }: { params: { slug: string } }) {
  const body = await req.json();
  const data: Record<string, unknown> = {};

  for (const key of ['title', 'location', 'status', 'type', 'image', 'description'] as const) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  for (const key of ['price', 'beds', 'baths', 'sqft'] as const) {
    if (body[key] !== undefined) data[key] = Number(body[key]);
  }
  if (body.gallery !== undefined) data.gallery = JSON.stringify(body.gallery);
  if (body.features !== undefined) data.features = JSON.stringify(body.features);

  try {
    const updated = await prisma.property.update({ where: { slug: params.slug }, data });
    return NextResponse.json(toProperty(updated));
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

// DELETE /api/properties/[slug]
export async function DELETE(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await prisma.property.delete({ where: { slug: params.slug } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
