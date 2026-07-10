import { PaymentAdminCache } from './cache';
import * as Constants from './constants';
import { paymentServiceInstance } from './payment.service-instance';
import type { AxiosError } from 'axios';
import { QUERIES } from 'rise-core-frontend';
import { MODELS } from '_types/';

const getAllTransactionsQueries = (
  args: QUERIES.QueryPayload<
    MODELS.ITransactionsResponse,
    undefined,
    MODELS.IGetTransactionsParams
  >,
) => {
  const { queryOptions, params } = args;

  return QUERIES.useCustomQuery<
    MODELS.IGetTransactionsParams,
    undefined,
    MODELS.ITransactionsResponse
  >({
    queryKey: [Constants.PAYMENT_ADMIN_KEYS.GET_ALL_TRANSACTIONS, params],
    queryFn: () => paymentServiceInstance().get_all_transactions(params),
    options: queryOptions,
  });
};

const getTransactionByIdQueries = (
  args: QUERIES.QueryPayload<
    MODELS.IPaymentTransactionsResponse,
    undefined,
    { transactionId: string }
  >,
) => {
  const { queryOptions, params } = args;

  return QUERIES.useCustomQuery<
    { transactionId: string },
    undefined,
    MODELS.IPaymentTransactionsResponse
  >({
    queryKey: [Constants.PAYMENT_ADMIN_KEYS.GET_TRANSACTION_BY_ID, params],
    queryFn: () => paymentServiceInstance().get_transaction_by_id(params?.transactionId!),
    options: queryOptions,
  });
};

const refundTransactionMutation = (
  args: QUERIES.MutationPayload<{ data: MODELS.IPaymentPayoutPayload }, undefined, { id: string }>,
) => {
  return QUERIES.useCustomMutation<
    { data: MODELS.IPaymentPayoutPayload },
    undefined,
    { id: string }
  >({
    mutationFn: ({ payload, params }) =>
      paymentServiceInstance().refund_transaction(params?.id!, payload?.data!),
    options: args.mutationOptions,
  });
};

const getAllRefundsQueries = (
  args: QUERIES.QueryPayload<MODELS.IPaymentPayoutResponseList, undefined, MODELS.IGetPayoutParams>,
) => {
  const { queryOptions, params } = args;

  return QUERIES.useCustomQuery<
    MODELS.IGetPayoutParams,
    undefined,
    MODELS.IPaymentPayoutResponseList
  >({
    queryKey: [Constants.PAYMENT_ADMIN_KEYS.GET_ALL_REFUNDS, params],
    queryFn: () => paymentServiceInstance().all_refunds(params),
    options: queryOptions,
  });
};

const getRefundByIdQueries = (
  args: QUERIES.QueryPayload<
    MODELS.IPaymentPayoutByIdResponse,
    undefined,
    { transactionId: string }
  >,
) => {
  const { queryOptions, params } = args;

  return QUERIES.useCustomQuery<
    { transactionId: string },
    undefined,
    MODELS.IPaymentPayoutByIdResponse
  >({
    queryKey: [Constants.PAYMENT_ADMIN_KEYS.GET_REFUND_BY_ID, params],
    queryFn: () => paymentServiceInstance().refund_by_id(params?.transactionId!),
    options: queryOptions,
  });
};

export {
  getAllTransactionsQueries,
  getTransactionByIdQueries,
  refundTransactionMutation,
  getAllRefundsQueries,
  getRefundByIdQueries,
};
