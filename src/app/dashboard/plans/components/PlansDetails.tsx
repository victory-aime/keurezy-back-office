'use client';

import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { PlanModule } from '_store/state-management';
import { BaseButton, BaseContainer, BaseTabs, BaseTag, BaseText } from '_components/custom';
import { Status } from '@/types/enum/common';
import { IsDetailsDataLoad } from '@/app/components/DetailsLoad';
import { BO_ROUTES } from '@/app/routes';
import { PlansDeleteButton } from './PlansDeleteButton';

const PLAN_LABELS: Record<string, string> = {
  BASIC_COMMISSION: 'Basique (Commission)',
  STANDARD_COMMISSION: 'Standard (Commission)',
  PREMIUM_COMMISSION: 'Premium (Commission)',
  BASIC_SUB: 'Basique (Abonnement)',
  STANDARD_SUB: 'Standard (Abonnement)',
  PREMIUM_SUB: 'Premium (Abonnement)',
};

function getPriceDisplay(plan: any): string {
  if (!plan) return 'N/A';
  if (plan.pricingType === 'COMMISSION') {
    return plan.commissionRate != null ? `${plan.commissionRate}% de commission` : 'N/A';
  }
  if (!plan.pricings?.length) return 'N/A';
  return plan.pricings
    .map(
      (p: any) =>
        `${Number(p.price)} ${p.currency} / ${p.billingCycle === 'MONTHLY' ? 'mois' : 'an'}`,
    )
    .join(' · ');
}

export const PlansDetails = ({ id }: { id: string }) => {
  const router = useRouter(); // ✅ manquait

  const {
    data: planInfo,
    isFetching,
    refetch,
  } = PlanModule.getPlanInfo({
    params: { id },
    queryOptions: { enabled: !!id },
  });

  const { mutateAsync: togglePlanStatus, isPending } = PlanModule.togglePlanMutation({
    mutationOptions: {
      onSuccess: async () => {
        await refetch();
        PlanModule.PlansCache.invalidateAllPlansCache();
      },
    },
  });

  const isActive = planInfo?.isActive; // ✅ était "status"

  return (
    <BaseContainer border={'none'}>
      {isFetching ? (
        <IsDetailsDataLoad />
      ) : (
        <>
          <Flex align={{ base: 'flex-start', sm: 'center' }} justify="space-between" width="100%">
            <Flex align="center" gap={4} flex={1}>
              <Box>
                <Flex align="center" gap={2} mb={1} flexWrap="wrap">
                  <BaseText fontSize="xl" fontWeight="600" textTransform={'uppercase'}>
                    {PLAN_LABELS[planInfo?.name as string] ?? planInfo?.name}
                  </BaseText>
                  <BaseTag status={isActive ? Status.ACTIVE : Status.INACTIVE} />
                </Flex>
                <BaseText fontSize="sm" color="gray.500">
                  {planInfo?.planCategory === 'SUBSCRIPTION_BASED' ? 'Abonnement' : 'Commission'}
                </BaseText>
              </Box>
            </Flex>
            <Flex gap={2} flexWrap="wrap">
              <BaseButton
                variant={'outline'}
                colorType={!isActive ? 'success' : 'danger'}
                isLoading={isPending}
                onClick={async () => {
                  await togglePlanStatus({
                    payload: { isActive: !isActive }, // ✅ voir point 2 ci-dessous
                    params: { id: planInfo?.id! },
                  });
                }}
              >
                {isActive ? 'Désactiver' : 'Activer'}
              </BaseButton>
              <BaseButton
                variant={'outline'}
                colorType={'primary'}
                onClick={() => router.push(`${BO_ROUTES.PLANS.UPDATE}?id=${id}`)}
              >
                Modifier
              </BaseButton>
              <PlansDeleteButton id={id} />
            </Flex>
          </Flex>
          <BaseTabs
            variant={'line'}
            width={'full'}
            items={[
              {
                label: 'Informations',
                content: (
                  <Box py={4}>
                    <Box mb={4}>
                      <BaseText fontSize="sm" fontWeight="600" mb={1}>
                        Tarif
                      </BaseText>
                      <BaseText fontSize="md">{getPriceDisplay(planInfo)}</BaseText>
                    </Box>
                    <Box mb={4}>
                      <BaseText fontSize="sm" fontWeight="600" mb={1}>
                        Fonctionnalités
                      </BaseText>
                      <BaseText fontSize="sm">
                        {planInfo?.planFeatures?.length
                          ? planInfo.planFeatures
                              .map(
                                (pf: any) =>
                                  `${pf.feature?.name ?? pf.featureId}${pf.enabled ? '' : ' (désactivée)'}`,
                              )
                              .join(', ')
                          : 'N/A'}
                      </BaseText>
                    </Box>
                    <Box mb={4}>
                      <BaseText fontSize="sm" fontWeight="600" mb={1}>
                        Limites
                      </BaseText>
                      <BaseText fontSize="sm">
                        {planInfo?.planFeatures?.some((pf: any) => pf.limit != null)
                          ? planInfo.planFeatures
                              .filter((pf: any) => pf.limit != null)
                              .map((pf: any) => `${pf.feature?.name ?? pf.featureId}: ${pf.limit}`)
                              .join(', ')
                          : 'Illimité / N/A'}
                      </BaseText>
                    </Box>
                  </Box>
                ),
              },
            ]}
          />
        </>
      )}
    </BaseContainer>
  );
};
