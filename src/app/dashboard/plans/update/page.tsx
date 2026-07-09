import { PlansUpdateForm } from '../components/PlansUpdateForm';

export default async function PlanUpdatePage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const params = await searchParams;
  return <PlansUpdateForm id={params.id} />;
}
