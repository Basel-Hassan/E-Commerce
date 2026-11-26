import { getCategories, getShopCounts } from "@/actions/shop.actions";
import { getServerAuthSession } from "@/lib/auth";
import { withOptionalAuth } from "@/lib/auth-guard";

import { HeaderNav } from "./header-nav";
import { TopBar } from "./top-bar";

export async function Navbar() {
  const [session, categories, counts] = await Promise.all([
    getServerAuthSession().catch(() => null),
    getCategories().catch(() => []),
    withOptionalAuth(() => getShopCounts(), { cart: 0, wishlist: 0 }),
  ]);

  const user = session?.user
    ? { name: session.user.name ?? "My Account", email: session.user.email ?? "" }
    : null;

  return (
    <>
      <TopBar user={user} />
      <HeaderNav categories={categories} user={user} counts={counts} />
    </>
  );
}
