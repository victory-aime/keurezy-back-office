import { Toaster } from "_components/ui/toaster";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthContextProvider } from "./context/auth-context";
import { LoaderProvider } from "./context/loaderContext";
import GlobalApplicationProvider from "./context/provider/GlobalApplicationProvider";
import { I18nProvider } from "./context/provider/i18n-provider";
import { ThemeProvider } from "@/components/ui/provider";

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
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GlobalApplicationProvider>
          <ThemeProvider>
            <LoaderProvider>
              <Toaster />
              <AuthContextProvider>
                <I18nProvider>{children}</I18nProvider>
              </AuthContextProvider>
            </LoaderProvider>
          </ThemeProvider>
        </GlobalApplicationProvider>
      </body>
    </html>
  );
}
