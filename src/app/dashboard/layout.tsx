import { AuthContextProvider } from '_context/auth-context';
import { safeGetServerSession } from '@/app/hooks';
import { headers } from 'next/headers';
import { SessionRefreshProvider } from '_context/SessionRefresh-context';
import { UserProvider } from '_context/user-context';
import { Layout } from '@/app/Layout/Layout';
import React from 'react';
import 'react-international-phone/style.css';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await safeGetServerSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  return (
    <AuthContextProvider session={session?.data}>
      <SessionRefreshProvider error={session?.error?.toString()}>
        <UserProvider userId={session?.data?.user?.id}>
          <Layout>{children}</Layout>
        </UserProvider>
      </SessionRefreshProvider>
    </AuthContextProvider>
  );
}
