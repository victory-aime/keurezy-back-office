import { QUERIES } from 'rise-core-frontend';
import * as Constants from './constants';

export const PaymentAdminCache = {
  invalidateAllPaymentAdminCache: () =>
    QUERIES.QueryCache.invalidate([
      Constants.PAYMENT_ADMIN_KEYS.GET_ALL_TRANSACTIONS,
      Constants.PAYMENT_ADMIN_KEYS.GET_PAYMENT_STATS,
    ]),
};
