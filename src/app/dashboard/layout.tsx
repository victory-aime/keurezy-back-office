import { AuthContextProvider } from '_context/auth-context';
import { Geist, Geist_Mono } from 'next/font/google';
import { safeGetServerSession } from '@/app/hooks';
import { headers } from 'next/headers';
import { SessionRefreshProvider } from '_context/SessionRefresh-context';
import { UserProvider } from '_context/user-context';
import { DynamicThemeProvider } from '_context/theme-context';
import { Layout } from '@/app/Layout/Layout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await safeGetServerSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  console.log('DashboardLayout', session);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthContextProvider session={session?.data}>
          <SessionRefreshProvider error={session?.error?.toString()}>
            <UserProvider userId={session?.data?.user?.id}>
              <DynamicThemeProvider>
                <Layout>{children}</Layout>
              </DynamicThemeProvider>
            </UserProvider>
          </SessionRefreshProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
