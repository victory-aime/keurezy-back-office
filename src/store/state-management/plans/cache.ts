import { QUERIES } from 'rise-core-frontend';
import * as Constants from './constants';

export const PlansCache = {
  invalidateAllPlansCache: () => QUERIES.QueryCache.invalidate([Constants.PLAN_KEYS.PLANS_LIST]),
};
