'use client';

import { useRouter } from 'next/navigation';
import { useGlobalLoader } from '_context/loaderContext';
import { handleApiError } from '_utils/handleApiError';
import { handleApiSuccess } from '_utils/handleApiSuccess';
import { authClient } from '../lib/auth-client';
import { queryClient } from '../lib/query-client';
import { APP_ROUTES } from '../routes';

interface AuthTypes {
  email?: string;
  password?: string;
  callbackUrl?: string;
}

export const useAuth = () => {
  const router = useRouter();
  const { showLoader, hideLoader, isLoading } = useGlobalLoader();

  const logout = async () => {
    try {
      showLoader();
      await authClient.signOut();
      window.location.href = APP_ROUTES.SIGN_IN;
      queryClient.clear();
    } catch (error) {
      handleApiError({
        status: 500,
        message: 'Une erreur est survenue lors de la déconnexion.',
      });
    } finally {
      hideLoader();
    }
  };

  const login = async ({ email, password }: AuthTypes) => {
    try {
      const result = await authClient.signIn.email(
        {
          email: email!,
          password: password!,
        },
        {
          async onSuccess(context) {
            if (context.data.twoFactorRedirect) {
              router.replace(APP_ROUTES._2FA);
            }
          },
        },
      );
      if (result.error) {
        handleApiError({
          status: result.error.status,
          message: result.error.message!,
        });
        return;
      }
      if (result?.data?.token) {
        handleApiSuccess({ status: 200, message: 'Connexion réussie' });
        window.location.href = APP_ROUTES.ROOT;
      }
    } catch (error) {
      handleApiError({
        status: 500,
        message: 'Une erreur interne est survenue. Veuillez réessayer plus tard.',
      });
    }
  };

  return { logout, login, isLoading };
};
