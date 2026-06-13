'use client';

import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { LuCreditCard, LuCalendar, LuPercent } from 'react-icons/lu';
import { formatDisplayDate } from 'rise-core-frontend';
import {
  BaseFormatNumber,
  BaseTag,
  BaseText,
  CustomSkeletonLoader,
  DataTableContainer,
  Icons,
} from '_components/custom';
import { EmptyBlock } from '@/app/components/EmptyBlock';
import { useTranslation } from 'react-i18next';
import { MODELS } from '_types/';

export const AgencySubscriptionsTab = ({
  subscriptions,
}: {
  subscriptions: MODELS.IAgencySubscription[];
}) => {
  const { t } = useTranslation();

  if (!subscriptions.length) {
    return <EmptyBlock infoMessage={'  Aucun abonnement enregistré'} icon={Icons.CreditCard} />;
  }

  return (
    <Box>
      <Flex align="center" gap={2} mb={4}>
        <Icon as={LuCreditCard} boxSize={4} color="gray.400" />
        <Text
          fontSize="xs"
          fontWeight="600"
          color="gray.400"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          Historique d'abonnements
        </Text>
      </Flex>

      {subscriptions
        .filter((s) => s.status === 'ACTIVE')
        .map((sub) => (
          <Box
            key={sub.id}
            bg="white"
            _dark={{ bg: 'gray.800' }}
            border="0.5px solid"
            borderColor="inherit"
            borderRadius="xl"
            p={5}
          >
            <Flex justify="space-between" align="flex-start" flexWrap="wrap" gap={3}>
              <Box>
                <Flex align="center" gap={2} mb={1}>
                  <Text fontWeight="600" fontSize="md">
                    {t(`SUBSCRIPTION.PLANS.${sub.plan.name}`)}
                  </Text>
                  <BaseTag status={sub.status} />
                </Flex>
                <Text fontSize="sm" color="gray.500">
                  Type de plan: {t(`SUBSCRIPTION.PLAN_CATEGORY.${sub.plan.planCategory}`)}
                </Text>
              </Box>

              <Box textAlign="right">
                {sub.pricingType === 'COMMISSION' ? (
                  <Flex align="center" gap={1} justify="flex-end">
                    <Icon as={LuPercent} boxSize={4} color="green.500" />
                    <Text fontSize="xl" fontWeight="700" color="green.600">
                      {sub.commissionRate}%
                    </Text>
                  </Flex>
                ) : (
                  <BaseFormatNumber value={Number(sub.price) ?? 0} />
                )}
                {sub.billingCycle && (
                  <Text fontSize="xs" color="gray.400">
                    {t(`SUBSCRIPTION.BILLING_CYCLE.${sub.billingCycle}`)}
                  </Text>
                )}
              </Box>
            </Flex>

            {(sub.currentPeriodStart || sub.currentPeriodEnd) && (
              <Flex mt={4} pt={4} borderTop="0.5px solid" borderColor="inherit" gap={6}>
                <Flex align="center" gap={1.5}>
                  <Icon as={LuCalendar} boxSize={3.5} color="gray.400" />
                  <Text fontSize="xs" color="gray.500">
                    Début : {formatDisplayDate(sub.currentPeriodStart)}
                  </Text>
                </Flex>
                <Flex align="center" gap={1.5}>
                  <Icon as={LuCalendar} boxSize={3.5} color="gray.400" />
                  <Text fontSize="xs" color="gray.500">
                    Fin : {formatDisplayDate(sub.currentPeriodEnd)}
                  </Text>
                </Flex>
              </Flex>
            )}
          </Box>
        ))}

      {subscriptions?.length > 1 && (
        <DataTableContainer
          data={subscriptions}
          columns={[
            {
              header: 'Plan',
              accessor: 'plan',
              cell: (value) => {
                return <BaseText>{t(`SUBSCRIPTION.PLANS.${value.name}`)}</BaseText>;
              },
            },
            {
              header: 'Type',
              accessor: 'plan',
              cell: (plan) => (
                <BaseText>{t(`SUBSCRIPTION.PLAN_CATEGORY.${plan.planCategory}`)}</BaseText>
              ),
            },
            {
              header: 'Montant',
              accessor: 'fullObject',
              cell: (plan) => {
                return (
                  <>
                    {plan.pricingType === 'COMMISSION' ? (
                      <BaseFormatNumber value={plan.commissionRate / 100} style={'percent'} />
                    ) : (
                      <BaseFormatNumber value={plan.price} />
                    )}
                  </>
                );
              },
            },
            {
              header: 'Statut',
              accessor: 'status',
              cell: (status) => <BaseTag status={status} />,
            },
            {
              header: 'Souscrit le',
              accessor: 'createdAt',
              cell: (date) => <BaseText>{formatDisplayDate(date)}</BaseText>,
            },
          ]}
          hidePagination
        />
      )}
    </Box>
  );
};
