'use client';

import { Box, Flex } from '@chakra-ui/react';
import { PlanModule } from '_store/state-management';
import { BaseContainer, BaseTabs, BaseTag, BaseText } from '_components/custom';
import { Status } from '@/types/enum/common';
import { IsDetailsDataLoad } from '@/app/components/DetailsLoad';
import { useTranslation } from 'react-i18next';
import { PlanInfoTab } from './PlanInfoTab';
import { PlanSubscriptionTab } from './PlanSubscriptionTab';
import React from 'react';

export const PlansDetails = ({ id }: { id: string }) => {
  const { t } = useTranslation();

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
        <React.Fragment>
          <Flex align={{ base: 'flex-start', sm: 'center' }} justify="flex-start" width="100%">
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
        </React.Fragment>
      )}
    </BaseContainer>
  );
};
