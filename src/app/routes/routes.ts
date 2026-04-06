export enum ROUTES {
  USERS = "/users",
  PACKS = "/packs",
}

export const BO_ROUTES = {
  ROOT: "/",
  USERS: {
    LIST: `${ROUTES.USERS}`,
    DETAILS: `${ROUTES.USERS}/details`,
  },
  PACKS: {
    LIST: `${ROUTES.PACKS}`,
    DETAILS: `${ROUTES.PACKS}/details`,
  },
  _2FA: "/totp",
};
