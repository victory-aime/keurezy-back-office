import { UserDetails } from "../components/UserDetails";

export default async function UserDetailsPage({
  searchParams,
}: {
  searchParams: Promise<{ userId: string }>;
}) {
  const params = await searchParams;
  return <UserDetails userId={params.userId} />;
}
