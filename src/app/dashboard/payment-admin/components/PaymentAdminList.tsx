'use client';
import { BaseContainer, BaseTag, ColumnsDataTable, DataTableContainer } from '_components/custom';
import { PaymentAdminModule } from '_store/state-management';
import { useRouter } from 'next/navigation';
import { BO_ROUTES } from '@/app/routes';
import { ENUM } from '_types/';
import formatCurrency from '@/utils/formatCurrency';

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'En attente',
  PAID: 'Payée',
  FAILED: 'Échouée',
  CANCELLED: 'Annulée',
};

const STATUS_TAG_MAP: Record<string, ENUM.COMMON.Status> = {
  PAID: ENUM.COMMON.Status.ACTIVE,
  PENDING: ENUM.COMMON.Status.INFO,
  FAILED: ENUM.COMMON.Status.WARNING,
  CANCELLED: ENUM.COMMON.Status.WARNING,
};

function mapTransactionToRow(tx: any) {
  return {
    id: tx.id,
    userName: tx.user?.name ?? '—',
    userEmail: tx.user?.email ?? '—',
    planName: tx.plan?.name ?? '—',
    planPricingLabel: (() => {
      const pricings = tx.plan?.pricings ?? [];
      if (!pricings || pricings.length === 0) return tx.plan?.pricingType ?? '—';
      const monthly = pricings.find((p: any) => p.billingCycle === 'MONTHLY');
      const primary = monthly ?? pricings[0];
      return `${formatCurrency(primary.price, primary.currency ?? 'XOF')} ${
        primary.billingCycle === 'MONTHLY' ? '/ mois' : '/ an'
      }`;
    })(),
    planCurrency: tx.plan?.pricings?.[0]?.currency ?? 'XOF',
    amountLabel: formatCurrency(tx.amount_to_pay, tx.plan?.pricings?.[0]?.currency ?? 'XOF'),
    statusLabel: STATUS_LABELS[tx.status] ?? tx.status,
    status: tx.status,
    createdAt: tx.createdAt ? new Date(tx.createdAt).toLocaleDateString('fr-FR') : '—',
  };
}

function extractTransactionsArray(raw: any): any[] {
  if (Array.isArray(raw?.data?.content)) return raw.data.content;
  if (Array.isArray(raw?.content)) return raw.content;
  if (Array.isArray(raw?.data)) return raw.data;
  if (Array.isArray(raw)) return raw;
  return [];
}

export const PaymentAdminList = () => {
  const { data, isFetching, error } = PaymentAdminModule.getAllTransactionsQueries({});
  const router = useRouter();

  console.log('RAW DATA:', JSON.stringify(data, null, 2));
  console.log('ERROR:', error);

  const rows = extractTransactionsArray(data).map(mapTransactionToRow);

  console.log('ROWS EXTRACTED:', rows);

  const columns: ColumnsDataTable[] = [
    { header: '', accessor: 'select' },
    { header: 'Client', accessor: 'userName' },
    { header: 'Email', accessor: 'userEmail' },
    { header: 'Plan', accessor: 'planName' },
    { header: 'Tarif plan', accessor: 'planPricingLabel' },
    { header: 'Montant', accessor: 'amountLabel' },
    {
      header: 'Statut',
      accessor: 'status',
      cell: (status: string) => (
        <BaseTag status={STATUS_TAG_MAP[status] ?? ENUM.COMMON.Status.INACTIVE} />
      ),
    },
    { header: 'Date', accessor: 'createdAt' },
    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'view',
          handleClick: (value) => router.push(`${BO_ROUTES.PAYMENT_ADMIN.DETAILS}?id=${value.id}`),
        },
      ],
    },
  ];

  return (
    <BaseContainer
      title={'Transactions'}
      description={'Consulter toutes les transactions de paiement'}
      border={'none'}
    >
      <DataTableContainer
        data={rows}
        columns={columns}
        isLoading={isFetching}
        onOpenSelectRow={(row) => router.push(`${BO_ROUTES.PAYMENT_ADMIN.DETAILS}?id=${row.id}`)}
        isOpenSelect
        hidePagination
      />
    </BaseContainer>
  );
};
