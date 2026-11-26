import type { Metadata } from "next";

import { getAddresses } from "@/actions/address.actions";
import { ProfileAddresses } from "@/components/profile/profile-addresses";
import { withAuth } from "@/lib/auth-guard";

export const metadata: Metadata = {
  title: { absolute: "FreshCart" },
  description: "Manage your FreshCart delivery addresses.",
};

export default async function ProfileAddressesPage() {
  const addresses = await withAuth(() => getAddresses(), "/profile/addresses");

  return (
    <main className="flex-1 min-w-0">
      <ProfileAddresses initialAddresses={addresses} />
    </main>
  );
}
