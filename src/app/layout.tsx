import { Toaster } from '_components/ui/toaster';
import { Geist, Geist_Mono } from 'next/font/google';
import { LoaderProvider } from '_context/loaderContext';
import GlobalApplicationProvider from './context/provider/GlobalApplicationProvider';
import { I18nProvider } from '_context/provider/i18n-provider';
import { ThemeProvider } from '@/components/ui/provider';
import React from 'react';

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
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GlobalApplicationProvider>
          <ThemeProvider>
            <LoaderProvider minDuration={2000}>
              <Toaster />
              <I18nProvider>{children}</I18nProvider>
            </LoaderProvider>
          </ThemeProvider>
        </GlobalApplicationProvider>
      </body>
    </html>
  );
}
