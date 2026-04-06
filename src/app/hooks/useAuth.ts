import { useRouter } from "next/navigation";
import { useGlobalLoader } from "_context/loaderContext";
import { handleApiError } from "_utils/handleApiError";
import { handleApiSuccess } from "_utils/handleApiSuccess";
import { authClient } from "../lib/auth-client";
import { queryClient } from "../lib/query-client";
import { BO_ROUTES } from "../routes";

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
      const { data } = await authClient.signOut();
      if (data?.success) {
        router.refresh();
        queryClient.clear();
      }
    } finally {
      hideLoader();
    }
  };

  const login = async ({ email, password, callbackUrl }: AuthTypes) => {
    try {
      const result = await authClient.signIn.email(
        {
          email: email!,
          password: password!,
        },
        {
          async onSuccess(context) {
            if (context.data.twoFactorRedirect) {
              router.replace(BO_ROUTES._2FA);
            } else {
              router.refresh();
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
      if (result?.data.url) {
        handleApiSuccess({ status: 200, message: "Connexion réussie" });
        router.replace(result.data.url);
      }
    } catch (error) {
      console.log("error catch", error);
    }
  };

  return { logout, login, isLoading };
};
