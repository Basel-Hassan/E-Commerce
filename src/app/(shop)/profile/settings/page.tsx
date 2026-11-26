import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/actions/user.actions";
import { ProfileSettings } from "@/components/profile/profile-settings";
import { invalidSessionPath, withAuth } from "@/lib/auth-guard";

export const metadata: Metadata = {
  title: { absolute: "FreshCart" },
  description: "Manage your FreshCart account settings and password.",
};

export default async function ProfileSettingsPage() {
  const user = await withAuth(() => getCurrentUser(), "/profile/settings");

  if (!user) {
    redirect(invalidSessionPath("/profile/settings"));
  }

  return (
    <main className="flex-1 min-w-0">
      <ProfileSettings user={user} />
    </main>
  );
}
