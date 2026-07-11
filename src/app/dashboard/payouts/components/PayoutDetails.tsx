'use client';

import { BaseButton, BaseContainer, BaseTag, BaseText, Icons } from '_components/custom';
import { PaymentModule } from '_store/state-management';
import { ENUM } from '_types/';
import { DetailsContainer } from '@/app/components/DetailsContainer';
import { IsDetailsDataLoad } from '@/app/components/DetailsLoad';
import { NoDataAnimation } from '_components/custom/data-table/NoDataAnimation';
import React, { useState } from 'react';
import { Flex, Box, HStack, VStack } from '@chakra-ui/react';
import { PayoutGlobalDetails } from './PayoutGlobalDetails';
import { PayoutOrderView } from './PayoutOrderView';

export const PayoutDetails = ({ order_id }: { order_id: string }) => {
  const { data: payout, isFetching } = PaymentModule.getRefundByIdQueries({
    params: {
      transactionId: order_id,
    },
    queryOptions: { enabled: true },
  });

  if (!payout && !isFetching) return <NoDataAnimation />;

  return (
    <BaseContainer border="none">
      {isFetching ? (
        <IsDetailsDataLoad type={'payout'} />
      ) : (
        <VStack align={'flex-start'} width={'full'} gap={5}>
          <Flex align={{ base: 'flex-start', sm: 'center' }} justify="space-between" width="100%">
            <Box>
              <BaseText fontSize="xl" fontWeight="600" textTransform={'uppercase'}>
                Details du Payout
              </BaseText>

              <BaseText fontSize="sm" color="gray.500">
                Réference : #{payout?.order_id}
              </BaseText>
            </Box>
            <HStack>
              <BaseTag
                size={'xl'}
                status={payout?.payout_status.toUpperCase() as ENUM.COMMON.Status}
              />
              <BaseButton colorType={'info'} isLoading={false}>
                Télecharger le reçu
              </BaseButton>
            </HStack>
          </Flex>

          <PayoutGlobalDetails payout={payout} />

          <PayoutOrderView payout={payout} />

          <DetailsContainer width={'full'}>
            <Flex align={'center'} gap={3} mb={3}>
              <Icons.Chat />
              Bénéficiaire
            </Flex>
            {payout?.reason}
          </DetailsContainer>
        </VStack>
      )}
    </BaseContainer>
  );
};
