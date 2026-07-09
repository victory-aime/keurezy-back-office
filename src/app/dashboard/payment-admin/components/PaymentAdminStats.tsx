'use client';
import { Box, SimpleGrid, Spinner } from '@chakra-ui/react';
import { BaseContainer, BaseStats, Icons } from '_components/custom';
import { PaymentAdminModule } from '_store/state-management';
import { ENUM } from '_types/';

type PaymentAdminStatsType = {
  transactions: {
    total: number;
    paid: number;
    pending: number;
    failed: number;
    cancelled: number;
  };
  revenue: {
    total: number;
    currency: ENUM.COMMON.Currency | string;
  };
};

export const PaymentAdminStats = () => {
  const { data: stats, isFetching } = PaymentAdminModule.getPaymentStatsQueries({}) as {
    data?: PaymentAdminStatsType;
    isFetching: boolean;
  };

  const items = [
    {
      label: 'Total transactions',
      value: stats?.transactions.total ?? 0,
      icon: <Icons.StatsChart />,
      color: 'purple.600',
    },
    {
      label: 'Payées',
      value: stats?.transactions.paid ?? 0,
      icon: <Icons.Check />,
      color: 'green.600',
    },
    {
      label: 'En attente',
      value: stats?.transactions.pending ?? 0,
      icon: <Icons.Timer />,
      color: 'orange.600',
    },
    {
      label: 'Échouées',
      value: stats?.transactions.failed ?? 0,
      icon: <Icons.Warn />,
      color: 'red.600',
    },
    {
      label: 'Annulées',
      value: stats?.transactions.cancelled ?? 0,
      icon: <Icons.CircleClose />,
      color: 'gray.600',
    },
    {
      label: 'Revenu total',
      value: `${stats?.revenue.total ?? 0} ${stats?.revenue.currency ?? ''}`,
      icon: <Icons.Wallet />,
      color: 'teal.600',
    },
  ];

  return (
    <BaseContainer title="Statistiques" description="Vue d'ensemble des paiements">
      {isFetching ? (
        <Box py={20} textAlign="center">
          <Spinner size="xl" />
        </Box>
      ) : (
        <SimpleGrid width="full" columns={{ base: 1, sm: 2, lg: 5 }} gap={4}>
          {items.map((kpi) => (
            <BaseStats
              key={kpi.label}
              title={kpi.label}
              value={kpi.value}
              icon={kpi.icon}
              iconBgColor={kpi.color}
              isLoading={isFetching}
            />
          ))}
        </SimpleGrid>
      )}
    </BaseContainer>
  );
};
