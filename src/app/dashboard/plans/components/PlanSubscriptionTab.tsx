import { DetailsContainer } from '@/app/components/DetailsContainer';
import { BO_ROUTES } from '@/app/routes';
import { BaseTag, BaseText, ColumnsDataTable, DataTableContainer } from '@/components/custom';
import { Flex, Icon } from '@chakra-ui/react';
import { LuBuilding } from 'react-icons/lu';
import { MODELS } from '@/types';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

export function PlanSubscriptionTab({ subscriptions }: { subscriptions: MODELS.ISubscription[] }) {
  const { t } = useTranslation();
  const router = useRouter();

  const subscriptionColumns: ColumnsDataTable[] = [
    {
      header: 'Agence',
      accessor: 'fullObject',
      cell: (row) => <BaseText textTransform="uppercase">{row.agency.name}</BaseText>,
    },
    {
      header: 'Email',
      accessor: 'fullObject',
      cell: (row) => <BaseText color={'primary.600'}>{row.agency.email}</BaseText>,
    },
    {
      header: 'Téléphone',
      accessor: 'fullObject',
      cell: (row) => row.agency.phone,
    },
    {
      header: 'Propriétaire',
      accessor: 'fullObject',
      cell: (row) => <BaseText textTransform="uppercase">{row.agency.owner.user.name}</BaseText>,
    },
    {
      header: "Statut de l'agence",
      accessor: 'fullObject',
      cell: (row) => <BaseTag status={row.agency.status} />,
    },

    {
      header: 'Cycle',
      accessor: 'billingCycle',
      cell: (billingCycle) => t(`SUBSCRIPTION.BILLING_CYCLE.${billingCycle}`),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'view',
          handleClick: (value) => {
            router.push(`${BO_ROUTES.AGENCIES.DETAILS}?id=${value.agency?.id}`);
          },
        },
      ],
    },
  ];

  return (
    <DetailsContainer>
      <Flex align="center" gap={2} mb={4}>
        <Icon as={LuBuilding} boxSize={4} color="gray.400" />
        <BaseText fontSize="xs" fontWeight="600" color="gray.400" textTransform="uppercase">
          Agences abonnées à ce plan
        </BaseText>
      </Flex>
      <DataTableContainer
        data={subscriptions ?? []}
        columns={subscriptionColumns}
        onOpenSelectRow={(row) => router.push(`${BO_ROUTES.AGENCIES.DETAILS}?id=${row.agency?.id}`)}
        hidePagination
        isOpenSelect
      />
    </DetailsContainer>
  );
}
