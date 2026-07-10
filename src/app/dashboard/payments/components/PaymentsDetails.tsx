'use client';
import { BaseContainer, BaseFormatNumber, BaseTag, BaseText, Icons } from '_components/custom';
import { PaymentModule } from '_store/state-management';
import { ENUM } from '_types/';
import { DisplayInfoRow } from '@/app/components/DisplayInfoRow';
import { DetailsContainer } from '@/app/components/DetailsContainer';
import { convertDateFormat, getTimeValue } from 'rise-core-frontend';
import { useTranslation } from 'react-i18next';
import { IsDetailsDataLoad } from '@/app/components/DetailsLoad';
import { NoDataAnimation } from '_components/custom/data-table/NoDataAnimation';

export const PaymentsDetails = ({ order_id }: { order_id: string }) => {
  const { t } = useTranslation();
  const { data: transaction, isFetching } = PaymentModule.getTransactionByIdQueries({
    params: {
      transactionId: order_id,
    },
    queryOptions: { enabled: !!order_id },
  });

  if (!transaction) return <NoDataAnimation />;

  const planType = transaction.products[0].name.replace(/^Abonnement\s+/, '') as ENUM.PlanType;

  return (
    <BaseContainer
      title={`Transaction #${transaction.order_id}`}
      description="Détail de la transaction de paiement"
      border="none"
    >
      {isFetching ? (
        <IsDetailsDataLoad />
      ) : (
        <DetailsContainer width={'full'} mt={5}>
          <DisplayInfoRow icon={Icons.StatsChart} label={'Status'}>
            <BaseTag status={transaction.transaction_status.toUpperCase() as ENUM.COMMON.Status} />
          </DisplayInfoRow>
          <DisplayInfoRow icon={Icons.Payment} label={'Montant'}>
            <BaseFormatNumber value={transaction.amount} />
          </DisplayInfoRow>
          <DisplayInfoRow icon={Icons.Payment} label={'Frais'}>
            <BaseFormatNumber value={transaction.fees} />
          </DisplayInfoRow>
          <DisplayInfoRow icon={Icons.Payment} label={'Frais payés par'}>
            {transaction.fees_customer_side && <BaseTag label={'Client'} colorPalette={'green'} />}
          </DisplayInfoRow>
          <DisplayInfoRow icon={Icons.Cash} label={'Méthode de paiement'}>
            {transaction.selected_payment_method}
          </DisplayInfoRow>
          <DisplayInfoRow icon={Icons.Calendar} label={'Date de paiement'}>
            {convertDateFormat(transaction.paid_at)} à {getTimeValue(transaction.paid_at)}
          </DisplayInfoRow>
          <DisplayInfoRow icon={Icons.User} label={'Client'}>
            {transaction.customer.first_name} {transaction.customer.last_name}
          </DisplayInfoRow>
          <DisplayInfoRow icon={Icons.Phone} label={'Numéro'}>
            {transaction.customer.phone}
          </DisplayInfoRow>
          <DisplayInfoRow icon={Icons.Paper} label={'Plan'}>
            <BaseText>{t(`SUBSCRIPTION.PLANS.${planType}`)}</BaseText>
          </DisplayInfoRow>
        </DetailsContainer>
      )}
    </BaseContainer>
  );
};
