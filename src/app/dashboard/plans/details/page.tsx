import { PlansDetails } from '../components/PlansDetails';

export default async function PlanDetailsPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const params = await searchParams;
  return <PlansDetails id={params.id} />;
}
