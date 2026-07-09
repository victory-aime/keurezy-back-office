import { PaymentAdminCache } from './cache';
import * as Constants from './constants';
import { paymentAdminServiceInstance } from './payment-admin.service-instance';
import * as PAYMENT_TYPES from '../../../types/models/payment-admin';
import type { AxiosError } from 'axios';
import { QUERIES } from 'rise-core-frontend';

const getAllTransactionsQueries = (
  args: QUERIES.QueryPayload<PAYMENT_TYPES.IPaymentTransactionsResponse>,
) => {
  const { queryOptions, params } = args;

  return QUERIES.useCustomQuery<undefined, undefined, PAYMENT_TYPES.IPaymentTransactionsResponse>({
    queryKey: [Constants.PAYMENT_ADMIN_KEYS.GET_ALL_TRANSACTIONS],
    queryFn: () => paymentAdminServiceInstance().get_all_transactions(),
    options: queryOptions,
  });
};

const getPaymentStatsQueries = (
  args: QUERIES.QueryPayload<
    PAYMENT_TYPES.IPaymentStatsResponse,
    undefined,
    undefined,
    AxiosError<unknown, any>
  >,
) => {
  const { queryOptions } = args;

  return QUERIES.useCustomQuery<PAYMENT_TYPES.IPaymentStatsResponse>({
    queryKey: [Constants.PAYMENT_ADMIN_KEYS.GET_PAYMENT_STATS],
    queryFn: () => paymentAdminServiceInstance().get_payment_stats(),
    options: queryOptions as any,
  });
};

const getTransactionByIdQueries = (
  id: string,
  args: QUERIES.QueryPayload<
    PAYMENT_TYPES.IPaymentTransaction,
    undefined,
    undefined,
    AxiosError<unknown, any>
  >,
) => {
  const { queryOptions } = args;

  return QUERIES.useCustomQuery<PAYMENT_TYPES.IPaymentTransaction>({
    queryKey: [Constants.PAYMENT_ADMIN_KEYS.GET_TRANSACTION_BY_ID, id],
    queryFn: () => paymentAdminServiceInstance().get_transaction_by_id(id),
    options: queryOptions as any,
  });
};

const refundTransactionMutation = () => {
  return QUERIES.useCustomMutation<undefined, PAYMENT_TYPES.IRefundResponse, { id: string }>({
    mutationFn: ({ params }) => paymentAdminServiceInstance().refund_transaction(params!.id),
    options: {
      onSuccess: () => {
        PaymentAdminCache.invalidateAllPaymentAdminCache();
      },
    },
  });
};

export {
  getAllTransactionsQueries,
  getPaymentStatsQueries,
  getTransactionByIdQueries,
  refundTransactionMutation,
};
