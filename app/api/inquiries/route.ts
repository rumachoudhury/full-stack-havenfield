import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// POST /api/inquiries
// Body: { name, email, message?, tourDate?, propertySlug? }
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.name || !body.email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
  }

  let propertyId: string | undefined;
  if (body.propertySlug) {
    const property = await prisma.property.findUnique({ where: { slug: body.propertySlug } });
    propertyId = property?.id;
  }

  const inquiry = await prisma.inquiry.create({
    data: {
      name: body.name,
      email: body.email,
      message: body.message ?? null,
      tourDate: body.tourDate ? new Date(body.tourDate) : null,
      propertyId: propertyId ?? null,
    },
  });

  return NextResponse.json({ success: true, id: inquiry.id }, { status: 201 });
}

// GET /api/inquiries — list all inquiries (for an admin view)
export async function GET() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
    include: { property: true },
  });
  return NextResponse.json(inquiries);
}
