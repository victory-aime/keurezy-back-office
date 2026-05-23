import * as Constants from './constants';
import { usersServiceInstance } from './users.service-instance';
import { MODELS } from '_types/index';
import { QUERIES } from 'rise-core-frontend';

const getUserInfo = (args: QUERIES.QueryPayload<{ userId: MODELS.IUser }>) => {
  const { params, queryOptions } = args;

  return QUERIES.useCustomQuery<MODELS.IUser>({
    queryKey: [Constants.USERS_KEYS.GET_USER_INFO],
    queryFn: () => usersServiceInstance().user_info(params?.userId),
    options: queryOptions,
  });
};

const getAllUserQueries = (
  args: QUERIES.QueryPayload<{
    initialPage: number;
    limitPerPage: number;
  }>,
) => {
  const { queryOptions, params } = args;

  return QUERIES.useCustomQuery<MODELS.IPaginatedResponse<MODELS.IUser>>({
    queryKey: [Constants.USERS_KEYS.GET_ALL_USERS, params],
    queryFn: () =>
      usersServiceInstance().getAllUsers({
        initialPage: params?.initialPage,
        limitPerPage: params?.limitPerPage,
      }),
    options: queryOptions,
  });
};

const getUserQueries = (
  args: QUERIES.QueryPayload<{
    userId: string;
  }>,
) => {
  const { queryOptions, params } = args;
  return QUERIES.useCustomQuery<MODELS.IUserInfoResponse>({
    queryKey: [Constants.USERS_KEYS.GET_USER, params],
    queryFn: () => usersServiceInstance().getUser({ userId: params?.userId }),
    options: queryOptions,
  });
};

export { getUserInfo, getAllUserQueries, getUserQueries };
