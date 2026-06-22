'use client';
import { BaseContainer, BaseTag, ColumnsDataTable, DataTableContainer } from '_components/custom';
import { PlanModule } from '_store/state-management';
import { useRouter } from 'next/navigation';
import { BO_ROUTES } from '@/app/routes';
import { ENUM } from '_types/';

const PLAN_LABELS: Record<string, string> = {
  BASIC_COMMISSION: 'Basique (Commission)',
  STANDARD_COMMISSION: 'Standard (Commission)',
  PREMIUM_COMMISSION: 'Premium (Commission)',
  BASIC_SUB: 'Basique (Abonnement)',
  STANDARD_SUB: 'Standard (Abonnement)',
  PREMIUM_SUB: 'Premium (Abonnement)',
};

const CATEGORY_LABELS: Record<string, string> = {
  COMMISSION_BASED: 'Commission',
  SUBSCRIPTION_BASED: 'Abonnement',
};

function getPriceLabel(plan: any): string {
  if (plan.pricingType === 'COMMISSION') {
    return plan.commissionRate != null ? `${plan.commissionRate}% commission` : '—';
  }
  if (!plan.pricings || plan.pricings.length === 0) return '—';

  const monthly = plan.pricings.find((p: any) => p.billingCycle === 'MONTHLY');
  const yearly = plan.pricings.find((p: any) => p.billingCycle === 'YEARLY');
  const primary = monthly ?? plan.pricings[0];
  const cycleLabel = primary.billingCycle === 'MONTHLY' ? '/ mois' : '/ an';
  let label = `${Number(primary.price)} ${primary.currency} ${cycleLabel}`;
  if (monthly && yearly) label += ' (+ tarif annuel dispo.)';
  return label;
}

function mapPlanToRow(plan: any) {
  return {
    id: plan.id,
    displayName: PLAN_LABELS[plan.name] ?? plan.name ?? '—',
    categoryLabel: CATEGORY_LABELS[plan.planCategory] ?? plan.planCategory ?? '—',
    priceLabel: getPriceLabel(plan),
    isActive: plan.isActive,
    subscriptionsCount: plan._count?.subscriptions ?? 0,
  };
}

function extractPlansArray(raw: any): any[] {
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.data)) return raw.data;
  if (Array.isArray(raw?.plans)) return raw.plans;
  if (Array.isArray(raw?.result)) return raw.result;
  return [];
}

export const PlansList = () => {
  const { data: allPlans, isFetching, error } = PlanModule.allPlansListQueries({});
  const router = useRouter();

  const rows = extractPlansArray(allPlans).map(mapPlanToRow);

  const plansColumns: ColumnsDataTable[] = [
    { header: '', accessor: 'select' },
    { header: 'Nom', accessor: 'displayName' },
    { header: 'Catégorie', accessor: 'categoryLabel' },
    { header: 'Tarif', accessor: 'priceLabel' },
    {
      header: 'Statut',
      accessor: 'isActive',
      cell: (isActive: boolean) => (
        <BaseTag status={isActive ? ENUM.COMMON.Status.ACTIVE : ENUM.COMMON.Status.INACTIVE} />
      ),
    },
    { header: 'Abonnés', accessor: 'subscriptionsCount' },
    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'view',
          handleClick: (value) => router.push(`${BO_ROUTES.PLANS.DETAILS}?id=${value.id}`),
        },
        {
          name: 'edit',
          handleClick: (value) => router.push(`${BO_ROUTES.PLANS.UPDATE}?id=${value.id}`),
        },
      ],
    },
  ];

  return (
    <BaseContainer
      title={'Liste des plans'}
      description={'Consulter et gérer tous les plans disponibles dans Keurezy'}
      border={'none'}
      withActionButtons
      actionsButtonProps={{ onClick: () => router.push(`${BO_ROUTES.PLANS.LIST}/create`) }}
    >
      <DataTableContainer
        data={rows}
        columns={plansColumns}
        isLoading={isFetching}
        onOpenSelectRow={(row) => router.push(`${BO_ROUTES.PLANS.DETAILS}?id=${row.id}`)}
        isOpenSelect
        hidePagination
      />
    </BaseContainer>
  );
};
