export enum ROUTES {
  USERS = 'users',
  PACKS = 'packs',
  PLANS = 'plans',
  DASHBOARD = '/dashboard',
  AGENCIES = 'agencies',
}

const BASE = {
  DASHBOARD: '/dashboard',
  PLANS: 'plans',
  USERS: 'users',
  AGENCIES: 'agencies',
  PACKS: 'packs',
} as const;

export const APP_ROUTES = {
  ROOT: '/',
  _2FA: '/totp',
  SIGN_IN: '/signin',
  PROTECTED: '/not-authenticated',
};

export const BO_ROUTES = {
  DASHBOARD: ROUTES.DASHBOARD,
  AGENCIES: {
    LIST: `${ROUTES.DASHBOARD}/${ROUTES.AGENCIES}`,
    DETAILS: `${ROUTES.DASHBOARD}/${ROUTES.AGENCIES}/details`,
  },
  USERS: {
    LIST: `${ROUTES.DASHBOARD}/${ROUTES.USERS}`,
    DETAILS: `${ROUTES.DASHBOARD}/${ROUTES.USERS}/details`,
  },
  PACKS: {
    LIST: `${ROUTES.DASHBOARD}/${ROUTES.PACKS}`,
    DETAILS: `${ROUTES.DASHBOARD}/${ROUTES.PACKS}/details`,
  },
  PLANS: {
    LIST: `${ROUTES.DASHBOARD}/${ROUTES.PLANS}`,
    DETAILS: `${ROUTES.DASHBOARD}/${ROUTES.PLANS}/details`,
    CREATE: `${ROUTES.DASHBOARD}/${ROUTES.PLANS}/create`,
    UPDATE: `${ROUTES.DASHBOARD}/${ROUTES.PLANS}/update`,
    TOGGLE_STATUS: `${ROUTES.DASHBOARD}/${ROUTES.PLANS}/toggle-status`,
    DELETE: `${ROUTES.DASHBOARD}/${ROUTES.PLANS}/delete`,
  },
};

export const ROUTE_PARENTS: Record<string, string> = {
  [BO_ROUTES.USERS.DETAILS]: BO_ROUTES.USERS.LIST,
  [BO_ROUTES.AGENCIES.DETAILS]: BO_ROUTES.AGENCIES.LIST,
  [BO_ROUTES.PACKS.DETAILS]: BO_ROUTES.PACKS.LIST,
  [BO_ROUTES.PLANS.DETAILS]: BO_ROUTES.PLANS.LIST,
};
