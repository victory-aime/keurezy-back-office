import { QUERIES } from 'rise-core-frontend';
import * as Constants from './constants';

export const PaymentAdminCache = {
  invalidateAllPaymentAdminCache: () =>
    QUERIES.QueryCache.invalidate([
      Constants.PAYMENTS_KEYS.GET_ALL_TRANSACTIONS,
      Constants.PAYMENTS_KEYS.GET_ALL_REFUNDS,
    ]),
};
