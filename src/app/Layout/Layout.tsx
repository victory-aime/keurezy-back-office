'use client';

import React, { FunctionComponent, useState } from 'react';
import { Container } from './container/Container';
import { Sidebar } from './sidebar/Sidebar';
import { Footer } from './footer/Footer';
import { SidebarInset } from './sidebar/components/SidebarInset';
import { Header } from './header/Header';

export const Layout: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <main className="main">
      <Sidebar onShowSidebar={() => setSidebarOpen(!isSidebarOpen)} sideToggled={isSidebarOpen} />
      <SidebarInset variant="inset" collapsed={!isSidebarOpen} data-tour="finish">
        <Header sideToggled={isSidebarOpen} onShowSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <Container sidebarToggle={isSidebarOpen}>{children}</Container>
        <Footer />
      </SidebarInset>
    </main>
  );
};
