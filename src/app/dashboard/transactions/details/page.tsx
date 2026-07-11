import { TransactionDetails } from '../components/TransactionDetails';

export default async function TransactionDetailsPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const params = await searchParams;
  return <TransactionDetails order_id={params.id} />;
}
