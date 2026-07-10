import { PaymentsDetails } from '../components/PaymentsDetails';

export default async function PaymentsDetailsPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const params = await searchParams;
  return <PaymentsDetails order_id={params.id} />;
}
