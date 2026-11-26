"use server";

import { revalidatePath } from "next/cache";

import { actionError, actionOk } from "@/lib/action-result";
import { apiFetch } from "@/lib/api";
import { requireApiToken } from "@/lib/auth-guard";
import type { ActionResult } from "@/types/action";
import type {
  Product,
  WishlistApiResponse,
} from "@/types/shop";

const WISHLIST_PATH = "api/v1/wishlist";

function revalidateShop() {
  revalidatePath("/", "layout");
}

async function fetchWishlist(token: string) {
  const response = await apiFetch<WishlistApiResponse>(WISHLIST_PATH, {
    token,
    next: { revalidate: 0 },
  });

  return response.data ?? [];
}

export async function getWishlist(): Promise<Product[]> {
  const token = await requireApiToken();
  return fetchWishlist(token);
}

export async function addToWishlist(
  productId: string,
): Promise<ActionResult<{ added: true }>> {
  try {
    const token = await requireApiToken();
    const items = await fetchWishlist(token);

    if (items.some((item) => item._id === productId)) {
      return actionOk({ added: true });
    }

    await apiFetch(WISHLIST_PATH, {
      method: "POST",
      token,
      body: { productId },
    });

    revalidateShop();
    return actionOk({ added: true });
  } catch (error) {
    return actionError(error);
  }
}

export async function removeFromWishlist(
  productId: string,
): Promise<ActionResult<{ removed: true }>> {
  try {
    const token = await requireApiToken();
    await apiFetch(`${WISHLIST_PATH}/${productId}`, {
      method: "DELETE",
      token,
    });

    revalidateShop();
    return actionOk({ removed: true });
  } catch (error) {
    return actionError(error);
  }
}

export async function moveToCart(
  productId: string,
): Promise<ActionResult<{ moved: true }>> {
  try {
    const token = await requireApiToken();

    await apiFetch("api/v1/cart", {
      method: "POST",
      token,
      body: { productId },
    });

    await apiFetch(`${WISHLIST_PATH}/${productId}`, {
      method: "DELETE",
      token,
    });

    revalidateShop();
    return actionOk({ moved: true });
  } catch (error) {
    return actionError(error);
  }
}
