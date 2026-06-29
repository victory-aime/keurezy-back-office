'use client';
import {
  BaseContainer,
  BaseFormatNumber,
  BaseSwitch,
  BaseText,
  ColumnsDataTable,
  DataTableContainer,
} from '_components/custom';
import { PlanModule } from '_store/state-management';
import { useRouter } from 'next/navigation';
import { BO_ROUTES } from '@/app/routes';
import { ENUM, MODELS } from '_types/';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { PlanForm } from './PlanForm';

export const PlansList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<MODELS.IPlan>({} as MODELS.IPlan);

  const { data: allPlans, isFetching, refetch } = PlanModule.allPlansListQueries({});
  const { mutateAsync: togglePlanStatus, isPending } = PlanModule.togglePlanMutation({
    mutationOptions: {
      onSuccess: async () => {
        PlanModule.PlansCache.invalidateAllPlansCache();
      },
    },
  });

  const plansColumns: ColumnsDataTable[] = [
    { header: '', accessor: 'select' },
    {
      header: 'Nom',
      accessor: 'name',
      cell: (name: ENUM.PlanType) => t(`SUBSCRIPTION.PLANS.${name}`),
    },
    {
      header: 'Catégorie',
      accessor: 'planCategory',
      cell: (category: ENUM.PlanCategory) => t(`SUBSCRIPTION.PLAN_CATEGORY.${category}`),
    },
    {
      header: 'Tarif Mensuel',
      accessor: 'pricing',
      cell: (pricing: MODELS.IPlanPricing[]) => {
        const data = pricing?.find((data) => data.billingCycle === ENUM.BillingCycleType.MONTHLY);
        return <BaseFormatNumber value={data?.price ?? 0} />;
      },
    },
    {
      header: 'Tarif Annuel',
      accessor: 'pricing',
      cell: (pricing: MODELS.IPlanPricing[]) => {
        const data = pricing?.find((data) => data.billingCycle !== ENUM.BillingCycleType.MONTHLY);
        return <BaseFormatNumber value={data?.price ?? 0} />;
      },
    },
    {
      header: 'Réduction Annuel',
      accessor: 'pricing',
      cell: (pricing: MODELS.IPlanPricing[]) => {
        const data = pricing?.find((data) => data.billingCycle !== ENUM.BillingCycleType.MONTHLY);
        return (
          <BaseText color={'primary.500'}>
            <BaseFormatNumber value={(data?.discountPercentage ?? 0) / 100} style={'percent'} /> /
            an
          </BaseText>
        );
      },
    },
    { header: 'Abonnés', accessor: 'subscriptionCount' },
    {
      header: 'Status',
      accessor: 'fullObject',
      cell: (data: MODELS.IPlan) => {
        return (
          <BaseSwitch
            isChecked={data.status}
            isLoading={isPending}
            onSwitchChange={async () => {
              await togglePlanStatus({
                payload: { isActive: !data.status },
                params: { id: data.id },
              });
            }}
          />
        );
      },
    },
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
          handleClick: (value) => {
            setSelectedValues(value);
            setOpenForm(true);
          },
        },
      ],
    },
  ];

  return (
    <BaseContainer
      title={'Liste des plans'}
      description={'Consulter et gérer tous les plans disponibles'}
      border={'none'}
      loader={isFetching}
      withActionButtons
      actionsButtonProps={{
        validateTitle: 'Ajouter un plan',
        onClick: () => setOpenForm(true),
        onReload: async () => {
          await refetch();
        },
      }}
    >
      <DataTableContainer
        data={allPlans ?? []}
        columns={plansColumns}
        isLoading={isFetching}
        hidePagination
      />
      <PlanForm data={selectedValues} onChange={setOpenForm} isOpen={undefined} />
    </BaseContainer>
  );
};
