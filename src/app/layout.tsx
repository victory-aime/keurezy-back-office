import { Toaster } from "_components/ui/toaster";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthContextProvider } from "./context/auth-context";
import { LoaderProvider } from "./context/loaderContext";
import GlobalApplicationProvider from "./context/provider/GlobalApplicationProvider";
import { I18nProvider } from "./context/provider/i18n-provider";
import { ThemeProvider } from "@/components/ui/provider";
import { authClient } from "./lib/auth-client";
import { headers } from "next/headers";
import { SignIn } from "./components/SignIn";
import { Layout } from "./Layout/Layout";
import { SessionRefreshProvider } from "./context/SessionRefresh-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GlobalApplicationProvider>
          <ThemeProvider>
            <LoaderProvider>
              <Toaster />
              <I18nProvider>
                {session?.data ? (
                  <AuthContextProvider session={session?.data}>
                    <SessionRefreshProvider>
                      <Layout>{children}</Layout>
                    </SessionRefreshProvider>
                  </AuthContextProvider>
                ) : (
                  <SignIn />
                )}
              </I18nProvider>
            </LoaderProvider>
          </ThemeProvider>
        </GlobalApplicationProvider>
      </body>
    </html>
  );
}
