import { DetailsContainer } from '@/app/components/DetailsContainer';
import { BaseText, BaseIcon, Icons, BaseFormatNumber } from '@/components/custom';
import { ENUM, MODELS } from '@/types';
import { Flex, Box } from '@chakra-ui/react';
import { t } from 'i18next';
import React from 'react';
import { convertDateFormat, getTimeValue } from 'rise-core-frontend';

export function PayoutGlobalDetails({
  payout,
}: {
  payout: MODELS.IPayoutByIdResponse | undefined;
}) {
  return (
    <Flex width={'full'} align={'flex-start'} justifyContent={'space-between'} gap={4}>
      <DetailsContainer width={'full'}>
        <Flex align={'center'} justifyContent={'space-between'} mb={4}>
          <BaseText color="gray.500">Montant du Payout</BaseText>
          <BaseIcon boxSize={'30px'} rounded={'full'} color={'red.solid'}>
            <Icons.Cash />
          </BaseIcon>
        </Flex>
        <Box>
          <BaseText fontWeight={'bold'} fontSize={'lg'}>
            <BaseFormatNumber value={1000} />
          </BaseText>
          <BaseText fontSize={'sm'} color="gray.500">
            Montant transferé au bénéficiaire
          </BaseText>
        </Box>
      </DetailsContainer>
      <DetailsContainer width={'full'}>
        <Flex align={'center'} mb={4} justifyContent={'space-between'}>
          <BaseText color={'gray.500'}>Statut</BaseText>
          <BaseIcon
            rounded={'full'}
            boxSize={'30px'}
            color={
              payout?.payout_status.toUpperCase() === ENUM.COMMON.Status.COMPLETED
                ? 'success.500'
                : payout?.payout_status.toUpperCase() === ENUM.COMMON.Status.PENDING
                  ? 'orange'
                  : 'red'
            }
          >
            {payout?.payout_status.toUpperCase() === ENUM.COMMON.Status.COMPLETED ? (
              <Icons.Check />
            ) : payout?.payout_status.toUpperCase() === ENUM.COMMON.Status.PENDING ? (
              <Icons.Timer />
            ) : (
              <Icons.Close />
            )}
          </BaseIcon>
        </Flex>
        <Box>
          <BaseText fontWeight={'bold'} fontSize={'lg'}>
            {t(`COMMON.STATUS.${payout?.payout_status.toUpperCase()}`)}
          </BaseText>
          <BaseText fontSize={'sm'} color={'gray.500'}>
            Mis a jour le {convertDateFormat(payout?.updated_at)} a{' '}
            {getTimeValue(payout?.updated_at!)}
          </BaseText>
        </Box>
      </DetailsContainer>
      <DetailsContainer width={'full'}>
        <Flex align={'center'} mb={4} justifyContent={'space-between'}>
          <BaseText>Bénéficiaire</BaseText>
          <BaseIcon rounded={'full'} boxSize={'30px'}>
            <Icons.User />
          </BaseIcon>
        </Flex>
        <Box>
          <BaseText fontWeight={'bold'}>{payout?.recipient?.first_name}</BaseText>
          <BaseText color={'gray.500'} fontSize={'sm'}>
            {payout?.recipient.phone}
          </BaseText>
        </Box>
      </DetailsContainer>
    </Flex>
  );
}
