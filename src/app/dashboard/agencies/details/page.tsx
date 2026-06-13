import { AgencyDetails } from '../components/AgencyDetails';

export default async function AgencyDetailsPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const params = await searchParams;
  return <AgencyDetails id={params.id} />;
}
