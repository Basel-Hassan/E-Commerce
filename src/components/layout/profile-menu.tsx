"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import {
  ADDRESS_BOOK_PATH,
  BOX_OPEN_PATH,
  CIRCLE_USER_PATH,
  GEAR_PATH,
  HEART_PATH,
  InlineIcon,
  RIGHT_FROM_BRACKET_PATH,
  USER_PATH,
} from "./shell-primitives";

const itemClassName =
  "flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors";

export function ProfileMenu({
  user,
  className = "relative",
}: {
  user: { name: string; email: string };
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const frame = requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  function handleMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    event.preventDefault();
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? [],
    );
    if (items.length === 0) return;

    const current = items.indexOf(document.activeElement as HTMLElement);
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const next =
      current === -1
        ? direction === 1
          ? 0
          : items.length - 1
        : (current + direction + items.length) % items.length;
    items[next].focus();
  }

  return (
    <div className={className} ref={rootRef}>
      <button
        ref={triggerRef}
        className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
        title="Account"
        onClick={() => setOpen((value) => !value)}
      >
        <InlineIcon
          prefix="far"
          icon="circle-user"
          viewBox="0 0 512 512"
          path={CIRCLE_USER_PATH}
          className="text-xl text-gray-500 group-hover:text-primary-600 transition-colors"
        />
      </button>

      <div
        ref={menuRef}
        onKeyDown={handleMenuKeyDown}
        className={`absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl transition-all duration-200 origin-top-right ${
          open ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
        }`}
      >
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <InlineIcon
                prefix="far"
                icon="circle-user"
                viewBox="0 0 512 512"
                path={CIRCLE_USER_PATH}
                className="text-xl text-primary-600"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-400 truncate" />
            </div>
          </div>
        </div>

        <div className="py-2">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className={itemClassName}
          >
            <InlineIcon
              prefix="far"
              icon="user"
              viewBox="0 0 448 512"
              path={USER_PATH}
              className="w-4 text-gray-400"
            />
            My Profile
          </Link>
          <Link
            href="/orders"
            onClick={() => setOpen(false)}
            className={itemClassName}
          >
            <InlineIcon
              prefix="fas"
              icon="box-open"
              viewBox="0 0 640 512"
              path={BOX_OPEN_PATH}
              className="w-4 text-gray-400"
            />
            My Orders
          </Link>
          <Link
            href="/wishlist"
            onClick={() => setOpen(false)}
            className={itemClassName}
          >
            <InlineIcon
              prefix="far"
              icon="heart"
              viewBox="0 0 512 512"
              path={HEART_PATH}
              className="w-4 text-gray-400"
            />
            My Wishlist
          </Link>
          <Link
            href="/profile/addresses"
            onClick={() => setOpen(false)}
            className={itemClassName}
          >
            <InlineIcon
              prefix="far"
              icon="address-book"
              viewBox="0 0 512 512"
              path={ADDRESS_BOOK_PATH}
              className="w-4 text-gray-400"
            />
            Addresses
          </Link>
          <Link
            href="/profile/settings"
            onClick={() => setOpen(false)}
            className={itemClassName}
          >
            <InlineIcon
              prefix="fas"
              icon="gear"
              viewBox="0 0 512 512"
              path={GEAR_PATH}
              className="w-4 text-gray-400"
            />
            Settings
          </Link>
        </div>

        <div className="border-t border-gray-100 py-2">
          <button
            onClick={() => {
              setOpen(false);
              signOut({ callbackUrl: "/" });
            }}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
          >
            <InlineIcon
              prefix="fas"
              icon="right-from-bracket"
              viewBox="0 0 512 512"
              path={RIGHT_FROM_BRACKET_PATH}
              className="w-4"
            />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
