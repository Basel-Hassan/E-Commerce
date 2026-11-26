"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import type { ShopCounts } from "@/types/shop";
import freshcartLogo from "@/assets/freshcart-logo.svg";

import {
  BARS_PATH,
  CART_PATH,
  CATEGORY_LINKS,
  CHEVRON_DOWN_PATH,
  HEADSET_PATH,
  HEART_PATH,
  InlineIcon,
  MobileCountBadge,
  RIGHT_FROM_BRACKET_PATH,
  SEARCH_PATH,
  USER_PATH,
  XMARK_PATH,
  type NavUser,
} from "./shell-primitives";

type MobileMenuContextValue = {
  open: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

const MobileMenuContext = createContext<MobileMenuContextValue | null>(null);

export function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openMenu = useCallback(() => setOpen(true), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <MobileMenuContext.Provider value={{ open, openMenu, closeMenu }}>
      {children}
    </MobileMenuContext.Provider>
  );
}

export function useMobileMenu() {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error("useMobileMenu must be used inside MobileMenuProvider");
  }
  return context;
}

export function SearchForm({
  className,
  onSubmitted,
  mobile = false,
}: {
  className?: string;
  onSubmitted?: () => void;
  mobile?: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    onSubmitted?.();
    router.push(value ? `/search?q=${encodeURIComponent(value)}` : "/search");
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className={mobile ? "relative" : "relative w-full"}>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={
            mobile ? "Search products..." : "Search for products, brands and more..."
          }
          className={
            mobile
              ? "w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm"
              : "w-full px-5 py-3 pr-12 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
          }
        />
        <button
          type="submit"
          className={
            mobile
              ? "absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center"
              : "absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors"
          }
        >
          <InlineIcon
            icon="magnifying-glass"
            viewBox="0 0 512 512"
            path={SEARCH_PATH}
            className="text-sm"
          />
        </button>
      </div>
    </form>
  );
}

export function CategoryDropdown() {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 text-gray-700 hover:text-primary-600 font-medium transition-colors py-2">
        Categories
        <InlineIcon
          icon="chevron-down"
          viewBox="0 0 448 512"
          path={CHEVRON_DOWN_PATH}
          className="text-[10px] transition-transform group-hover:rotate-180"
        />
      </button>
      <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2 min-w-[200px]">
          {CATEGORY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MobileMenuToggle() {
  const { open, openMenu, closeMenu } = useMobileMenu();

  return (
    <button
      onClick={open ? closeMenu : openMenu}
      className="lg:hidden ml-1 w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-colors"
    >
      {open ? (
        <InlineIcon
          icon="xmark"
          viewBox="0 0 384 512"
          path={XMARK_PATH}
        />
      ) : (
        <InlineIcon
          icon="bars"
          viewBox="0 0 448 512"
          path={BARS_PATH}
        />
      )}
    </button>
  );
}

export function MobileMenu({
  user,
  counts,
}: {
  user: NavUser;
  counts: ShopCounts;
}) {
  const { open, closeMenu } = useMobileMenu();

  useEffect(() => {
    if (!open) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeMenu]);

  return (
    <div
      className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeMenu();
      }}
    >
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <Image
            src={freshcartLogo}
            alt="FreshCart"
            width={160}
            height={31}
            loading="lazy"
            className="h-8 w-auto"
          />
          <button
            onClick={closeMenu}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <InlineIcon
              icon="xmark"
              viewBox="0 0 384 512"
              path={XMARK_PATH}
              className="text-gray-600"
            />
          </button>
        </div>

        <SearchForm
          className="p-4 border-b border-gray-100"
          onSubmitted={closeMenu}
          mobile
        />

        <nav className="p-4">
          <div className="space-y-1">
            {[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/products" },
              { label: "Categories", href: "/categories" },
              { label: "Brands", href: "/brands" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="mx-4 border-t border-gray-100" />

        <div className="p-4 space-y-1">
          <Link
            href="/wishlist"
            onClick={closeMenu}
            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                <InlineIcon
                  prefix="far"
                  icon="heart"
                  viewBox="0 0 512 512"
                  path={HEART_PATH}
                  className="text-red-500"
                />
              </div>
              <span className="font-medium text-gray-700">Wishlist</span>
            </div>
            <MobileCountBadge count={counts.wishlist} />
          </Link>
          <Link
            href="/cart"
            onClick={closeMenu}
            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center">
                <InlineIcon
                  icon="cart-shopping"
                  viewBox="0 0 640 512"
                  path={CART_PATH}
                  className="text-primary-600"
                />
              </div>
              <span className="font-medium text-gray-700">Cart</span>
            </div>
            <MobileCountBadge count={counts.cart} />
          </Link>
        </div>

        <div className="mx-4 border-t border-gray-100" />

        {user ? (
          <div className="p-4 space-y-1">
            <Link
              href="/profile"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                <InlineIcon
                  prefix="far"
                  icon="user"
                  viewBox="0 0 448 512"
                  path={USER_PATH}
                  className="text-gray-500"
                />
              </div>
              <span className="font-medium text-gray-700">{user.name}</span>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors w-full text-left"
            >
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                <InlineIcon
                  icon="right-from-bracket"
                  viewBox="0 0 512 512"
                  path={RIGHT_FROM_BRACKET_PATH}
                  className="text-red-500"
                />
              </div>
              <span className="font-medium text-red-600">Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-1">
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                href="/login"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-primary-600 text-primary-600 font-semibold hover:bg-primary-50 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}

        <Link
          href="/contact"
          onClick={closeMenu}
          className="mx-4 mt-2 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3 hover:bg-primary-50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <InlineIcon
              icon="headset"
              viewBox="0 0 448 512"
              path={HEADSET_PATH}
              className="text-primary-600"
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-700">Need Help?</div>
            <div className="text-sm text-primary-600">Contact Support</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
