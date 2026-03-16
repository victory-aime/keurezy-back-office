import { SessionRefreshProvider } from "../context/SessionRefresh-context";
import { Layout } from "../Layout/Layout";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionRefreshProvider>
      <Layout>{children}</Layout>
    </SessionRefreshProvider>
  );
}
