import {
  ApiActionProps,
  APIObjectType,
  createApiAction,
} from "rise-core-frontend";

const APIS_ROUTES_MODULES_PATH = {
  USER: "/users",
  AGENCY: "/agency",
};

export const APIS = (baseUrl?: string) => {
  const api = (args: Omit<ApiActionProps, "baseUrl">): APIObjectType =>
    createApiAction({ ...args, baseUrl });

  return {
    USER: {
      INFO: api({
        path: `${APIS_ROUTES_MODULES_PATH.USER}/info`,
        method: "GET",
        pathBase: "SECURED_API",
        showResponse: false,
        handleErrorManually: false,
      }),
      ALL_USERS: api({
        path: `${APIS_ROUTES_MODULES_PATH.USER}/get-allUsers`,
        method: "GET",
        pathBase: "SECURED_API",
        showResponse: false,
      }),
    },
    AGENCY: {
      CREATE_AGENCY: api({
        path: `${APIS_ROUTES_MODULES_PATH.AGENCY}/create`,
        method: "POST",
        pathBase: "SECURED_API",
        showResponse: false,
      }),
      AGENCY_INFO: api({
        path: `${APIS_ROUTES_MODULES_PATH.AGENCY}`,
        method: "GET",
        pathBase: "SECURED_API",
        showResponse: false,
      }),
      UPDATE_AGENCY: api({
        path: `${APIS_ROUTES_MODULES_PATH.AGENCY}/update`,
        method: "POST",
        pathBase: "SECURED_API",
      }),
      CLOSE_AGENCY: api({
        path: `${APIS_ROUTES_MODULES_PATH.AGENCY}/close`,
        method: "POST",
        pathBase: "SECURED_API",
        showResponse: false,
      }),
      CHECK_NAME: api({
        path: `${APIS_ROUTES_MODULES_PATH.AGENCY}/verified-name`,
        method: "POST",
        pathBase: "UNSECURED_API",
        showResponse: false,
        handleErrorManually: false,
      }),
    },
  };
};
