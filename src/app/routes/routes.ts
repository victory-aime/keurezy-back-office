export enum ROUTES {
  USERS = 'users',
  PACKS = 'packs',
  DASHBOARD = '/dashboard',
  AGENCIES = 'agencies',
}

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
};

export const ROUTE_PARENTS: Record<string, string> = {
  [BO_ROUTES.USERS.DETAILS]: BO_ROUTES.USERS.LIST,
  [BO_ROUTES.AGENCIES.DETAILS]: BO_ROUTES.AGENCIES.LIST,
  [BO_ROUTES.PACKS.DETAILS]: BO_ROUTES.PACKS.LIST,
};
