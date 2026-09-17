import { prisma } from '@/lib/db';
import { toProperty } from '@/lib/mappers';

export async function getAllProperties() {
  const rows = await prisma.property.findMany({ orderBy: { createdAt: 'desc' } });
  return rows.map(toProperty);
}

export async function getFeaturedProperties(limit = 3) {
  const rows = await prisma.property.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
  return rows.map(toProperty);
}

export async function getPropertyBySlug(slug: string) {
  const row = await prisma.property.findUnique({ where: { slug } });
  return row ? toProperty(row) : null;
}
