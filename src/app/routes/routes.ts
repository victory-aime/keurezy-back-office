export enum ROUTES {
  DASHBOARD = "/dashboard",
  USERS = "/users",
}

export const BO_ROUTES = {
  ROOT: "/",
  DASHBOARD: ROUTES.DASHBOARD,
  USERS: {
    LIST: `${ROUTES.DASHBOARD}/users`,
    DETAILS: `${ROUTES.DASHBOARD}/users/details`,
  },
  _2FA: "/totp",
};
