import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields, twoFactorClient } from 'better-auth/client/plugins';
import { APP_ROUTES } from '../routes';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  plugins: [
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = APP_ROUTES._2FA;
      },
    }),
    inferAdditionalFields({
      user: {
        role: {
          type: 'string',
          input: false,
        },
      },
    }),
  ],
});
