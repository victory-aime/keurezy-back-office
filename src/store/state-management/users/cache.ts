import { QUERIES } from 'rise-core-frontend';
import * as Constants from './constants';

export const UsersCache = {
  invalidateAllUsersCache: () =>
    QUERIES.QueryCache.invalidate([Constants.USERS_KEYS.GET_ALL_USERS]),
};
