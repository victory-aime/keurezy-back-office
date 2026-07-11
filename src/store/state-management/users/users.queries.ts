import * as Constants from './constants';
import { usersServiceInstance } from './users.service-instance';
import { MODELS } from '_types/index';
import { QUERIES } from 'rise-core-frontend';

const getUserInfo = (args: QUERIES.QueryPayload<MODELS.IUser, undefined, { userId: string }>) => {
  const { params, queryOptions } = args;

  return QUERIES.useCustomQuery<{ userId: string }, undefined, MODELS.IUser>({
    queryKey: [Constants.USERS_KEYS.GET_USER_INFO],
    queryFn: () => usersServiceInstance().user_info(params?.userId!),
    options: queryOptions,
  });
};

const getAllUserQueries = (
  args: QUERIES.QueryPayload<
    MODELS.IPaginatedResponse<MODELS.IUser>,
    undefined,
    {
      initialPage: number;
      limitPerPage: number;
    }
  >,
) => {
  const { queryOptions, params } = args;

  return QUERIES.useCustomQuery<undefined, undefined, MODELS.IPaginatedResponse<MODELS.IUser>>({
    queryKey: [Constants.USERS_KEYS.GET_ALL_USERS, params],
    queryFn: () =>
      usersServiceInstance().getAllUsers({
        initialPage: params?.initialPage!,
        limitPerPage: params?.limitPerPage!,
      }),
    options: queryOptions,
  });
};

const getUserQueries = (
  args: QUERIES.QueryPayload<
    MODELS.IUserInfoResponse,
    undefined,
    {
      userId: string;
    }
  >,
) => {
  const { queryOptions, params } = args;
  return QUERIES.useCustomQuery<undefined, undefined, MODELS.IUserInfoResponse>({
    queryKey: [Constants.USERS_KEYS.GET_USER, params],
    queryFn: () => usersServiceInstance().getUser({ userId: params?.userId! }),
    options: queryOptions,
  });
};

const updateUserMutation = (args: QUERIES.MutationPayload<MODELS.IUser, any, { id: string }>) => {
  return QUERIES.useCustomMutation({
    mutationKey: [Constants.USERS_KEYS.UPDATE_USER],
    mutationFn: ({ payload, params }) => usersServiceInstance().update_user(payload!, params?.id!),
    options: args.mutationOptions,
  });
};

export { getUserInfo, getAllUserQueries, getUserQueries, updateUserMutation };
