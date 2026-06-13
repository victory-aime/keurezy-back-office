import { ApiActionProps, APIObjectType, createApiAction } from 'rise-core-frontend';

const APIS_ROUTES_MODULES_PATH = {
  USER: '/admin/users',
  PACKS: '/packs',
  AGENCY: '/admin/agencies',
};

export const APIS = (baseUrl?: string) => {
  const api = (args: Omit<ApiActionProps, 'baseUrl'>): APIObjectType =>
    createApiAction({ ...args, baseUrl });

  return {
    USER: {
      INFO: api({
        path: `${APIS_ROUTES_MODULES_PATH.USER}/info`,
        method: 'GET',
        pathBase: 'SECURED_API',
        showResponse: false,
        handleErrorManually: false,
      }),
      ALL_USERS: api({
        path: `${APIS_ROUTES_MODULES_PATH.USER}`,
        method: 'GET',
        pathBase: 'SECURED_API',
        showResponse: false,
      }),
      ONE_USER: api({
        path: `${APIS_ROUTES_MODULES_PATH.USER}/get-user`,
        method: 'GET',
        pathBase: 'SECURED_API',
        showResponse: false,
      }),
      UPDATE_USER: api({
        path: `${APIS_ROUTES_MODULES_PATH.USER}/status`,
        method: 'PATCH',
        pathBase: 'SECURED_API',
      }),
    },
    PACKS: {
      GET_ALL_PACKS: api({
        path: `${APIS_ROUTES_MODULES_PATH.PACKS}/get-all-packs`,
        method: 'GET',
        pathBase: 'SECURED_API',
        showResponse: false,
      }),
      ADD_PACK: api({
        path: `${APIS_ROUTES_MODULES_PATH.PACKS}/add-pack`,
        method: 'POST',
        pathBase: 'SECURED_API',
        showResponse: false,
      }),
      UPDATE_PACK: api({
        path: `${APIS_ROUTES_MODULES_PATH.PACKS}/update-pack`,
        method: 'PUT',
        pathBase: 'SECURED_API',
        showResponse: false,
      }),
    },
    AGENCY: {
      LIST: api({
        path: `${APIS_ROUTES_MODULES_PATH.AGENCY}`,
        method: 'GET',
        pathBase: 'SECURED_API',
        showResponse: false,
      }),
      AGENCY_INFO: api({
        path: `${APIS_ROUTES_MODULES_PATH.AGENCY}/detail`,
        method: 'GET',
        pathBase: 'SECURED_API',
        showResponse: false,
      }),
      UPDATE_AGENCY: api({
        path: `${APIS_ROUTES_MODULES_PATH.AGENCY}/update-status`,
        method: 'PATCH',
        pathBase: 'SECURED_API',
      }),
    },
  };
};
