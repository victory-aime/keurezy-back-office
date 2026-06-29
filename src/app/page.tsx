'use client';

import { useEffect } from 'react';
import { KeurezyLogoAnimation } from '_components/custom';
import { APP_ROUTES, BO_ROUTES } from '@/app/routes';
import { authClient } from '@/app/lib/auth-client';

export default function RedirectAfterLogin() {
  const { data: session, isPending } = authClient.useSession();

  const roleToDashboardMap: Record<string, string> = {
    SUPER_ADMIN: BO_ROUTES.DASHBOARD,
  };
  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      const timer = setTimeout(() => {
        window.location.href = APP_ROUTES.SIGN_IN;
      }, 1000);
      return () => clearTimeout(timer);
    }
    const dashboardUrl = roleToDashboardMap[session.user.role];
    window.location.href = dashboardUrl ?? APP_ROUTES.SIGN_IN;
  }, [session, isPending]);

  return <KeurezyLogoAnimation isExiting={!isPending} onAnimationComplete={() => {}} />;
}
