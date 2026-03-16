"use client";

import React, { FunctionComponent, useState } from "react";
import { Container } from "./container/Container";
import { useAuthContext } from "_context/auth-context";
import { Sidebar } from "./sidebar/Sidebar";
import { Footer } from "./footer/Footer";
import { SidebarInset } from "./sidebar/components/SidebarInset";
import { Header } from "./header/Header";
import { InitializeApp } from "_context/provider/initialize-app";

export const Layout: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { session, user, isLoading } = useAuthContext();

  return (
    <InitializeApp isLoading={isLoading}>
      <Sidebar
        data={{ user }}
        onShowSidebar={() => setSidebarOpen(!isSidebarOpen)}
        sideToggled={isSidebarOpen}
      />
      <SidebarInset
        variant="inset"
        collapsed={!isSidebarOpen}
        data-tour="finish"
      >
        <Header
          sideToggled={isSidebarOpen}
          onShowSidebar={() => setSidebarOpen(!isSidebarOpen)}
          data={{ session }}
        />
        <Container sidebarToggle={isSidebarOpen}>{children}</Container>
        <Footer />
      </SidebarInset>
    </InitializeApp>
  );
};
