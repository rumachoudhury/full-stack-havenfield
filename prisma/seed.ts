import { PrismaClient } from '@prisma/client';
import { properties } from './seed-data';

const prisma = new PrismaClient();

async function main() {
  console.log(`Seeding ${properties.length} properties...`);

  for (const p of properties) {
    await prisma.property.upsert({
      where: { slug: p.id },
      update: {},
      create: {
        slug: p.id,
        title: p.title,
        location: p.location,
        price: p.price,
        status: p.status,
        type: p.type,
        beds: p.beds,
        baths: p.baths,
        sqft: p.sqft,
        image: p.image,
        gallery: JSON.stringify(p.gallery),
        description: p.description,
        features: JSON.stringify(p.features),
      },
    });
  }

  console.log('Done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
