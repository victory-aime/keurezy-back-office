'use client';

import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { PlanModule } from '_store/state-management';
import { BaseButton, BaseContainer, BaseTabs, BaseTag, BaseText } from '_components/custom';
import { Status } from '@/types/enum/common';
import { IsDetailsDataLoad } from '@/app/components/DetailsLoad';
import { BO_ROUTES } from '@/app/routes';
import { useTranslation } from 'react-i18next';
import { PlanInfoTab } from './PlanInfoTab';
import { PlanSubscriptionTab } from './PlanSubscriptionTab';

export const PlansDetails = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data, isFetching } = PlanModule.allPlansListQueries({
    params: { id },
    queryOptions: { enabled: !!id },
  });

  const planInfo = data?.[0];
  const isActive = planInfo?.status;

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
                    {t(`SUBSCRIPTION.PLANS.${planInfo?.name}`)}
                  </BaseText>
                  <BaseTag status={isActive ? Status.ACTIVE : Status.INACTIVE} />
                </Flex>
                <BaseText fontSize="sm" color="gray.500">
                  {t(`SUBSCRIPTION.PLAN_CATEGORY.${planInfo?.planCategory}`)}
                </BaseText>
              </Box>
            </Flex>
            <BaseButton
              variant={'outline'}
              colorType={'primary'}
              onClick={() => router.push(`${BO_ROUTES.PLANS.UPDATE}?id=${id}`)}
            >
              Modifier
            </BaseButton>
          </Flex>
          <BaseTabs
            variant={'line'}
            width={'full'}
            items={[
              {
                label: 'Informations',
                content: <PlanInfoTab planInfo={planInfo} />,
              },
              {
                label: 'Abonnements',
                content: <PlanSubscriptionTab subscriptions={planInfo?.subscriptions ?? []} />,
              },
            ]}
          />
        </>
      )}
    </BaseContainer>
  );
};
