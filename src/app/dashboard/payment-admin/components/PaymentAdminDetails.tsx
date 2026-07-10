'use client';
import { BaseContainer, BaseTag } from '_components/custom';
import { PaymentModule } from '_store/state-management';
import { ENUM } from '_types/';

export const PaymentAdminDetails = ({ order_id }: { order_id: string }) => {
  const { data: transaction, isFetching } = PaymentModule.getTransactionByIdQueries({
    params: {
      transactionId: order_id,
    },
    queryOptions: { enabled: !!order_id },
  });

  if (isFetching) return <p>Chargement...</p>;
  if (!transaction) return <p>Transaction introuvable.</p>;

  return (
    <BaseContainer
      title={`Transaction #${transaction.order_id}`}
      description="Détail de la transaction de paiement"
      border="none"
    ></BaseContainer>
  );
};
