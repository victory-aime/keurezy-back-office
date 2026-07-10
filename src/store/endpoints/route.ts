import { ApiActionProps, APIObjectType, createApiAction } from 'rise-core-frontend';

const APIS_ROUTES_MODULES_PATH = {
  USER: '/admin/users',
  PACKS: '/admin/packs',
  AGENCY: '/admin/agencies',
  PLANS: '/admin/plans',
  PAYMENT: '/admin/payment',
};

export const APIS = (baseUrl?: string) => {
  const api = (args: Omit<ApiActionProps, 'baseUrl'>): APIObjectType =>
    createApiAction({ ...args, baseUrl });

  return {
    USER: {
      INFO: api({
        path: `/users/info`,
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

    PLANS: {
      LIST: api({
        path: `${APIS_ROUTES_MODULES_PATH.PLANS}`,
        method: 'GET',
        pathBase: 'SECURED_API',
        showResponse: false,
      }),
      DETAIL: api({
        path: `${APIS_ROUTES_MODULES_PATH.PLANS}/detail`,
        method: 'GET',
        pathBase: 'SECURED_API',
        showResponse: false,
      }),
      CREATE: api({
        path: `${APIS_ROUTES_MODULES_PATH.PLANS}/create`,
        method: 'POST',
        pathBase: 'SECURED_API',
        showResponse: false,
      }),
      UPDATE_PLAN: api({
        path: `${APIS_ROUTES_MODULES_PATH.PLANS}/update-plan`,
        method: 'PATCH',
        pathBase: 'SECURED_API',
        showResponse: false,
      }),
      TOGGLE_STATUS: api({
        path: `${APIS_ROUTES_MODULES_PATH.PLANS}/toggle-status`,
        method: 'PATCH',
        pathBase: 'SECURED_API',
        showResponse: false,
      }),
      DELETE: api({
        path: `${APIS_ROUTES_MODULES_PATH.PLANS}/delete`,
        method: 'DELETE',
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

    PAYMENT: {
      LIST: api({
        path: `${APIS_ROUTES_MODULES_PATH.PAYMENT}`,
        method: 'GET',
        pathBase: 'SECURED_API',
        showResponse: false,
      }),
      DETAIL: api({
        path: `${APIS_ROUTES_MODULES_PATH.PAYMENT}/detail`,
        method: 'GET',
        pathBase: 'SECURED_API',
        showResponse: false,
      }),
      REFUND: api({
        path: `${APIS_ROUTES_MODULES_PATH.PAYMENT}/refund`,
        method: 'POST',
        pathBase: 'SECURED_API',
      }),
      ALL_REFUNDS: api({
        path: `${APIS_ROUTES_MODULES_PATH.PAYMENT}/refund-all`,
        method: 'GET',
        pathBase: 'SECURED_API',
        showResponse: false,
      }),
      REFUND_BY_ID: api({
        path: `${APIS_ROUTES_MODULES_PATH.PAYMENT}/refund-id`,
        method: 'GET',
        pathBase: 'SECURED_API',
        showResponse: false,
      }),
    },
  };
};
