import { QUERIES } from 'rise-core-frontend';
import * as Constants from './constants';

export const AgencyCache = {
  invalidateAllAgencyCache: () =>
    QUERIES.QueryCache.invalidate([Constants.AGENCY_KEYS.AGENCIES_LIST]),
};
