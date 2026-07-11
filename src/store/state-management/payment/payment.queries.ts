import * as Constants from './constants';
import { paymentServiceInstance } from './payment.service-instance';
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
    queryKey: [Constants.PAYMENTS_KEYS.GET_ALL_TRANSACTIONS, params],
    queryFn: () => paymentServiceInstance().get_all_transactions(params),
    options: queryOptions,
  });
};

const getTransactionByIdQueries = (
  args: QUERIES.QueryPayload<MODELS.ITransactions, undefined, { transactionId: string }>,
) => {
  const { queryOptions, params } = args;

  return QUERIES.useCustomQuery<{ transactionId: string }, undefined, MODELS.ITransactions>({
    queryKey: [Constants.PAYMENTS_KEYS.GET_TRANSACTION_BY_ID, params],
    queryFn: () => paymentServiceInstance().get_transaction_by_id(params?.transactionId!),
    options: queryOptions,
  });
};

const refundMutation = (
  args: QUERIES.MutationPayload<MODELS.IPayoutPayload, undefined, { id: string }>,
) => {
  return QUERIES.useCustomMutation<MODELS.IPayoutPayload, undefined, { id: string }>({
    mutationFn: ({ payload, params }) =>
      paymentServiceInstance().refund_transaction(params?.id!, payload!),
    options: args.mutationOptions,
  });
};

const getAllRefundsQueries = (
  args: QUERIES.QueryPayload<MODELS.IPayoutResponse, undefined, MODELS.IGetPayoutParams>,
) => {
  const { queryOptions, params } = args;

  return QUERIES.useCustomQuery<MODELS.IGetPayoutParams, undefined, MODELS.IPayoutResponse>({
    queryKey: [Constants.PAYMENTS_KEYS.GET_ALL_REFUNDS, params],
    queryFn: () => paymentServiceInstance().all_refunds(params),
    options: queryOptions,
  });
};

const getRefundByIdQueries = (
  args: QUERIES.QueryPayload<MODELS.IPayoutByIdResponse, undefined, { transactionId: string }>,
) => {
  const { queryOptions, params } = args;

  return QUERIES.useCustomQuery<{ transactionId: string }, undefined, MODELS.IPayoutByIdResponse>({
    queryKey: [Constants.PAYMENTS_KEYS.GET_REFUND_BY_ID, params],
    queryFn: () => paymentServiceInstance().refund_by_id(params?.transactionId!),
    options: queryOptions,
  });
};

export {
  getAllTransactionsQueries,
  getTransactionByIdQueries,
  refundMutation,
  getAllRefundsQueries,
  getRefundByIdQueries,
};
