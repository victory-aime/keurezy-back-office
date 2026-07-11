'use client';

import {
  BaseButton,
  BaseContainer,
  BaseFormatNumber,
  BaseModal,
  BaseTag,
  BaseText,
  Icons,
} from '_components/custom';
import { PaymentModule } from '_store/state-management';
import { ENUM, MODELS } from '_types/';
import { DisplayInfoRow } from '@/app/components/DisplayInfoRow';
import { DetailsContainer } from '@/app/components/DetailsContainer';
import { convertDateFormat, getTimeValue } from 'rise-core-frontend';
import { useTranslation } from 'react-i18next';
import { IsDetailsDataLoad } from '@/app/components/DetailsLoad';
import { NoDataAnimation } from '_components/custom/data-table/NoDataAnimation';
import React, { useState } from 'react';
import { Flex, Box } from '@chakra-ui/react';

export const TransactionDetails = ({ order_id }: { order_id: string }) => {
  const { t } = useTranslation();
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const {
    data: transaction,
    isFetching,
    refetch,
  } = PaymentModule.getTransactionByIdQueries({
    params: {
      transactionId: order_id,
    },
    queryOptions: { enabled: !!order_id },
  });

  const { mutateAsync: refundTransaction, isPending } = PaymentModule.refundMutation({
    mutationOptions: {
      onSuccess: async () => {
        await refetch();
      },
    },
  });

  if (!transaction && !isFetching) return <NoDataAnimation />;

  const planType = transaction?.products[0].name.replace(/^Abonnement\s+/, '') as ENUM.PlanType;

  const handleRefund = async () => {
    if (transaction?.order_id) {
      const payload: MODELS.IPayoutPayload = {
        amount: transaction?.amount,
        reason: '',
        recipient: {
          first_name: transaction.customer.first_name,
          last_name: transaction.customer.last_name,
          phone: transaction.customer.phone,
        },
        selected_payment_method: transaction?.selected_payment_method,
      };
      await refundTransaction({ payload, params: { id: transaction.order_id } });
    }
  };

  return (
    <BaseContainer border="none">
      {isFetching ? (
        <IsDetailsDataLoad />
      ) : (
        <React.Fragment>
          <Flex align={{ base: 'flex-start', sm: 'center' }} justify="space-between" width="100%">
            <Box>
              <Flex align="center" gap={2} mb={1} flexWrap="wrap">
                <BaseText fontSize="xl" fontWeight="600" textTransform={'uppercase'}>
                  {`Transaction #${transaction?.order_id}`}
                </BaseText>
                <BaseTag
                  status={transaction?.transaction_status.toUpperCase() as ENUM.COMMON.Status}
                />
              </Flex>
              <BaseText fontSize="sm" color="gray.500">
                Détail de la transaction de paiement
              </BaseText>
            </Box>
            {(transaction?.transaction_status.toUpperCase() as ENUM.COMMON.Status) ===
              ENUM.COMMON.Status.PAID && (
              <BaseButton
                variant={'outline'}
                colorType={'danger'}
                isLoading={isPending}
                onClick={() => setOpenAlert(true)}
              >
                Rembourser
              </BaseButton>
            )}
          </Flex>

          <DetailsContainer width={'full'} mt={5}>
            <DisplayInfoRow icon={Icons.StatsChart} label={'Status'}>
              <BaseTag
                status={transaction?.transaction_status.toUpperCase() as ENUM.COMMON.Status}
              />
            </DisplayInfoRow>
            <DisplayInfoRow icon={Icons.Payment} label={'Montant'}>
              <BaseFormatNumber value={transaction?.amount ?? 0} />
            </DisplayInfoRow>
            <DisplayInfoRow icon={Icons.Payment} label={'Frais'}>
              <BaseFormatNumber value={transaction?.fees ?? 0} />
            </DisplayInfoRow>
            <DisplayInfoRow icon={Icons.Payment} label={'Frais payés par'}>
              {transaction?.fees_customer_side && (
                <BaseTag label={'Client'} colorPalette={'green'} />
              )}
            </DisplayInfoRow>
            <DisplayInfoRow icon={Icons.Cash} label={'Méthode de paiement'}>
              {transaction?.selected_payment_method}
            </DisplayInfoRow>
            <DisplayInfoRow icon={Icons.Calendar} label={'Date de paiement'}>
              {convertDateFormat(transaction?.paid_at)} à {getTimeValue(transaction?.paid_at!)}
            </DisplayInfoRow>
            <DisplayInfoRow icon={Icons.User} label={'Client'}>
              {transaction?.customer.first_name} {transaction?.customer.last_name}
            </DisplayInfoRow>
            <DisplayInfoRow icon={Icons.Phone} label={'Numéro'}>
              {transaction?.customer.phone}
            </DisplayInfoRow>
            <DisplayInfoRow icon={Icons.Paper} label={'Plan'}>
              <BaseText>{t(`SUBSCRIPTION.PLANS.${planType}`)}</BaseText>
            </DisplayInfoRow>
          </DetailsContainer>
        </React.Fragment>
      )}
      <BaseModal
        size={'sm'}
        isOpen={openAlert}
        title={'Remboursement'}
        icon={<Icons.CashV2 size={20} />}
        onChange={() => setOpenAlert(false)}
        onClick={handleRefund}
        modalType={'alertdialog'}
        buttonSaveTitle={'Oui'}
      >
        Êtes-vous sûr de vouloir rembourser cette transaction ? cette transaction ? Cette action est
        irréversible.
      </BaseModal>
    </BaseContainer>
  );
};
