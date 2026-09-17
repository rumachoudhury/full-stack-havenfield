import { getAllProperties } from '@/lib/queries';
import PropertiesClient from '@/components/PropertiesClient';

export const dynamic = 'force-dynamic';

export default async function PropertiesPage() {
  const properties = await getAllProperties();
  return <PropertiesClient properties={properties} />;
}
