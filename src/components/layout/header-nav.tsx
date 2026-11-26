import Image from "next/image";
import Link from "next/link";

import type { Category, ShopCounts } from "@/types/shop";
import freshcartLogo from "@/assets/freshcart-logo.svg";

import { Container } from "./container";
import {
  CategoryDropdown,
  MobileMenu,
  MobileMenuProvider,
  MobileMenuToggle,
  SearchForm,
} from "./header-interactions";
import { ProfileMenu } from "./profile-menu";
import {
  CART_PATH,
  CountBadge,
  HEADSET_PATH,
  HEART_PATH,
  InlineIcon,
  USER_PATH,
  type NavUser,
} from "./shell-primitives";

export function HeaderNav(props: {
  categories: Category[];
  user: NavUser;
  counts: ShopCounts;
}) {
  const { user, counts } = props;

  return (
    <MobileMenuProvider>
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="bg-white">
          <Container>
            <div className="flex items-center justify-between h-16 lg:h-[72px] gap-4 lg:gap-8">
              <Link href="/" className="shrink-0">
                <Image
                  src={freshcartLogo}
                  alt="FreshCart"
                  width={160}
                  height={31}
                  loading="lazy"
                  className="h-6 lg:h-8 w-auto"
                />
              </Link>

              <SearchForm className="hidden lg:flex flex-1 max-w-2xl" />

              <nav className="hidden xl:flex items-center gap-6">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Shop
                </Link>
                <CategoryDropdown />
                <Link
                  href="/brands"
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Brands
                </Link>
              </nav>

              <div className="flex items-center gap-1 lg:gap-2">
                <Link
                  href="/contact"
                  className="hidden lg:flex items-center gap-2 pr-3 mr-2 border-r border-gray-200 hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                    <InlineIcon
                      icon="headset"
                      viewBox="0 0 448 512"
                      path={HEADSET_PATH}
                      className="text-primary-600"
                    />
                  </div>
                  <div className="text-xs">
                    <div className="text-gray-400">Support</div>
                    <div className="font-semibold text-gray-700">24/7 Help</div>
                  </div>
                </Link>

                <Link
                  className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
                  title="Wishlist"
                  href="/wishlist"
                >
                  <InlineIcon
                    prefix="far"
                    icon="heart"
                    viewBox="0 0 512 512"
                    path={HEART_PATH}
                    className="text-xl text-gray-500 group-hover:text-primary-600 transition-colors"
                  />
                  <CountBadge count={counts.wishlist} />
                </Link>

                <Link
                  className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
                  title="Cart"
                  href="/cart"
                >
                  <InlineIcon
                    icon="cart-shopping"
                    viewBox="0 0 640 512"
                    path={CART_PATH}
                    className="text-xl text-gray-500 group-hover:text-primary-600 transition-colors"
                  />
                  <CountBadge count={counts.cart} />
                </Link>

                {user ? (
                  <ProfileMenu
                    user={user}
                    className="hidden lg:block relative"
                  />
                ) : (
                  <Link
                    href="/login"
                    className="hidden lg:flex items-center gap-2 ml-2 px-5 py-2.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors shadow-sm shadow-primary-600/20"
                  >
                    <InlineIcon
                      prefix="far"
                      icon="user"
                      viewBox="0 0 448 512"
                      path={USER_PATH}
                      className="text-xs"
                    />
                    Sign In
                  </Link>
                )}

                <MobileMenuToggle />
              </div>
            </div>
          </Container>
        </div>
      </header>

      <MobileMenu user={user} counts={counts} />
    </MobileMenuProvider>
  );
}
