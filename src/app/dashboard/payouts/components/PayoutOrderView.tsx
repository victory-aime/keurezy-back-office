import { DetailsContainer } from '@/app/components/DetailsContainer';
import { DisplayInfoRow } from '@/app/components/DisplayInfoRow';
import { BaseIcon, Icons, BaseText, BaseFormatNumber } from '@/components/custom';
import { MODELS } from '@/types';
import { Flex, Stack, Box, VStack } from '@chakra-ui/react';
import React from 'react';
import { convertDateFormat, getTimeValue } from 'rise-core-frontend';

export function PayoutOrderView({ payout }: { payout?: MODELS.IPayoutByIdResponse }) {
  return (
    <Flex width={'full'} gap={4}>
      <DetailsContainer width={'full'}>
        <Stack mb={3}>
          <Flex align={'center'} gap={3}>
            <BaseIcon rounded={'full'} boxSize={'30px'}>
              <Icons.User />
            </BaseIcon>
            Bénéficiaire
          </Flex>
          Détails du destinataire des fonds
        </Stack>

        <DisplayInfoRow icon={Icons.User} label={'Nom complet'}>
          {payout?.recipient.first_name} {payout?.recipient.last_name}
        </DisplayInfoRow>
        <DisplayInfoRow icon={Icons.Phone} label={'Date de création'}>
          {payout?.recipient.phone}
        </DisplayInfoRow>

        <Box borderRadius={'lg'} p={2} bg={'blue.muted'} color={'blue.solid'} mt={8}>
          <Flex gap={4} align={'flex-start'}>
            <Icons.Info size={30} />
            <VStack gap={1} align={'flex-start'}>
              <BaseText fontSize={'sm'}>Informations Importante</BaseText>
              <BaseText fontSize={'sm'}>
                Le transfert est effectué vers le compte mobile money associé à ce numéro de
                téléphone.
              </BaseText>
            </VStack>
          </Flex>
        </Box>
      </DetailsContainer>
      <DetailsContainer width={'full'}>
        <DisplayInfoRow icon={Icons.StatsChart} label={'Réference Commande'}>
          {payout?.order_id}
        </DisplayInfoRow>
        <DisplayInfoRow icon={Icons.Calendar} label={'Date de création'}>
          {convertDateFormat(payout?.created_at)} à {getTimeValue(payout?.created_at!)}
        </DisplayInfoRow>
        <DisplayInfoRow icon={Icons.Calendar} label={'Date de paiement'}>
          {convertDateFormat(payout?.paid_at)} à {getTimeValue(payout?.paid_at!)}
        </DisplayInfoRow>
        <DisplayInfoRow icon={Icons.Cash} label={'Méthode de utilisée'}>
          {payout?.selected_payment_method}
        </DisplayInfoRow>
        <DisplayInfoRow icon={Icons.Payment} label={'Montant net'}>
          <BaseFormatNumber value={payout?.amount ?? 0} />
        </DisplayInfoRow>
        <DisplayInfoRow icon={Icons.Payment} label={"Frais d'operation"}>
          <BaseFormatNumber value={payout?.fees ?? 0} />
        </DisplayInfoRow>

        <DisplayInfoRow label={'Total débité'}>
          <BaseText fontWeight={'bold'} fontSize={'xl'} color={'red.400'}>
            <BaseFormatNumber value={payout?.amount ?? 0} />
          </BaseText>
        </DisplayInfoRow>
      </DetailsContainer>
    </Flex>
  );
}
