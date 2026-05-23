export enum ROUTES {
  USERS = 'users',
  PACKS = 'packs',
  DASHBOARD = '/dashboard',
}

export const APP_ROUTES = {
  ROOT: '/',
  _2FA: '/totp',
  SIGN_IN: '/signin',
  PROTECTED: '/not-authenticated',
};

export const BO_ROUTES = {
  DASHBOARD: ROUTES.DASHBOARD,
  USERS: {
    LIST: `${ROUTES.DASHBOARD}/${ROUTES.USERS}`,
    DETAILS: `${ROUTES.DASHBOARD}/${ROUTES.USERS}/details`,
  },
  PACKS: {
    LIST: `${ROUTES.DASHBOARD}/${ROUTES.PACKS}`,
    DETAILS: `${ROUTES.DASHBOARD}/${ROUTES.PACKS}/details`,
  },
};
