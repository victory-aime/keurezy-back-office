import { QUERIES } from 'rise-core-frontend';
import * as Constants from './constants';

export const PacksCache = {
  invalidateAllPacksCache: () =>
    QUERIES.QueryCache.invalidate([Constants.PACKS_KEYS.GET_ALL_PACKS]),
};
