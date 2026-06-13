'use client';
import React, { ReactNode } from 'react';
import { QueryClientProvider } from 'rise-core-frontend';
import { applicationContext } from '_context/global-state';
import { AppContext } from '_context/app.context';
import { queryClient } from '../../lib/query-client';

export default function GlobalApplicationProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={applicationContext}>{children}</AppContext.Provider>
    </QueryClientProvider>
  );
}
