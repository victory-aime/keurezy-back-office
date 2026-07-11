import { PayoutDetails } from '../components/PayoutDetails';

export default async function PayoutDetailsPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const params = await searchParams;
  return <PayoutDetails order_id={params.id} />;
}
