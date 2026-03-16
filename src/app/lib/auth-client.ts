import { createAuthClient } from "better-auth/react";
import {
  inferAdditionalFields,
  twoFactorClient,
} from "better-auth/client/plugins";
import { BO_ROUTES } from "../routes";

export const authClient = createAuthClient({
  plugins: [
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = BO_ROUTES._2FA;
      },
    }),
    inferAdditionalFields({
      user: {
        role: {
          type: "string",
          input: false,
        },
      },
    }),
  ],
});
