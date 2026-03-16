"use client";

import { authClient } from "./lib/auth-client";
import { SignIn } from "./components/SignIn";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types/enum";
import { useGlobalLoader } from "./context/loaderContext";
import { BO_ROUTES } from "./routes";

export default function Home() {
  const router = useRouter();
  const { showLoader, hideLoader } = useGlobalLoader();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) {
      showLoader();
    }

    if (!session) {
      return hideLoader();
    } else if (
      session?.session?.token &&
      session?.user?.role === UserRole.ADMIN
    ) {
      router.replace(BO_ROUTES.DASHBOARD);
    } else {
      return hideLoader();
    }
  }, [session, isPending, router]);

  return <SignIn />;
}
