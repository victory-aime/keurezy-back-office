'use client';
import { BaseContainer, BaseTag } from '_components/custom';
import { PaymentAdminModule } from '_store/state-management';
import { useSearchParams } from 'next/navigation';
import { ENUM } from '_types/';
import { RefundButton } from '../components/RefundButton';
import formatCurrency from '@/utils/formatCurrency';

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'En attente',
  PAID: 'Payée',
  FAILED: 'Échouée',
  CANCELLED: 'Annulée',
};

export const PaymentAdminDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';

  const { data: transaction, isFetching } = PaymentAdminModule.getTransactionByIdQueries(id, {});

  if (isFetching) return <p>Chargement...</p>;
  if (!transaction) return <p>Transaction introuvable.</p>;

  const pricings = transaction.plan?.pricings ?? [];
  const defaultCurrency = pricings[0]?.currency ?? 'XOF';

  return (
    <BaseContainer
      title={`Transaction #${transaction.id}`}
      description="Détail de la transaction de paiement"
      border="none"
    >
      <div className="flex flex-col gap-4">
        <div>
          <strong>Client :</strong> {transaction.user?.name} ({transaction.user?.email})
        </div>
        <div>
          <strong>Plan :</strong> {transaction.plan?.name}
        </div>

        {pricings.length ? (
          <div>
            <strong>Tarifs du plan :</strong>
            <ul>
              {pricings.map((p) => (
                <li key={`${p.billingCycle}-${p.price}`}>
                  {formatCurrency(p.price, p.currency ?? defaultCurrency)} —{' '}
                  {p.billingCycle === 'MONTHLY' ? 'par mois' : 'par an'}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div>
          <strong>Montant :</strong> {formatCurrency(transaction.amount_to_pay, defaultCurrency)}
        </div>

        <div>
          <strong>Statut :</strong>{' '}
          <BaseTag
            status={
              transaction.status === 'PAID'
                ? ENUM.COMMON.Status.ACTIVE
                : transaction.status === 'PENDING'
                  ? ENUM.COMMON.Status.INFO
                  : ENUM.COMMON.Status.WARNING
            }
          />{' '}
          {STATUS_LABELS[transaction.status]}
        </div>

        <div>
          <strong>Créée le :</strong> {new Date(transaction.createdAt).toLocaleString('fr-FR')}
        </div>
        <div>
          <strong>Confirmée le :</strong>{' '}
          {transaction.confirmed_at
            ? new Date(transaction.confirmed_at).toLocaleString('fr-FR')
            : '—'}
        </div>

        <RefundButton transactionId={transaction.id} status={transaction.status} />
      </div>
    </BaseContainer>
  );
};
