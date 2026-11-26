"use server";

import { revalidatePath } from "next/cache";

import { actionError, actionOk } from "@/lib/action-result";
import { apiFetch } from "@/lib/api";
import { requireApiToken } from "@/lib/auth-guard";
import type { ActionResult } from "@/types/action";
import type {
  CartApiItem,
  CartApiResponse,
  CartItem,
  CartSnapshot,
} from "@/types/shop";

const CART_PATH = "api/v1/cart";

function normalizeCart(response: CartApiResponse): CartSnapshot {
  const products = response.data?.products ?? [];
  const items = products.filter(
    (item): item is CartItem => typeof item.product !== "string",
  );

  return {
    id: response.cartId ?? response.data?._id,
    items,
    itemCount: response.numOfCartItems ?? products.length,
    totalPrice: response.data?.totalCartPrice ?? 0,
  };
}

function getCartProductId(item: CartApiItem) {
  return typeof item.product === "string" ? item.product : item.product._id;
}

function revalidateShop() {
  revalidatePath("/", "layout");
}

export async function getCart(): Promise<CartSnapshot> {
  const token = await requireApiToken();
  const response = await apiFetch<CartApiResponse>(CART_PATH, {
    token,
    next: { revalidate: 0 },
  });

  return normalizeCart(response);
}

export async function addToCart({
  productId,
  quantity = 1,
}: {
  productId: string;
  quantity?: number;
}): Promise<ActionResult<CartSnapshot>> {
  try {
    const token = await requireApiToken();
    let response = await apiFetch<CartApiResponse>(CART_PATH, {
      method: "POST",
      token,
      body: { productId },
    });

    if (quantity > 1) {
      const currentItem = response.data?.products?.find(
        (item) => getCartProductId(item) === productId,
      );

      if (currentItem) {
        response = await apiFetch<CartApiResponse>(
          `${CART_PATH}/${productId}`,
          {
            method: "PUT",
            token,
            body: { count: currentItem.count + quantity - 1 },
          },
        );
      }
    }

    revalidateShop();
    return actionOk(normalizeCart(response));
  } catch (error) {
    return actionError(error);
  }
}

export async function updateCartItem(
  productId: string,
  count: number,
): Promise<ActionResult<CartSnapshot>> {
  try {
    if (!Number.isInteger(count) || count < 1) {
      throw new Error("Quantity must be at least 1.");
    }

    const token = await requireApiToken();
    const response = await apiFetch<CartApiResponse>(
      `${CART_PATH}/${productId}`,
      {
        method: "PUT",
        token,
        body: { count },
      },
    );

    revalidateShop();
    return actionOk(normalizeCart(response));
  } catch (error) {
    return actionError(error);
  }
}

export async function removeFromCart(
  productId: string,
): Promise<ActionResult<CartSnapshot>> {
  try {
    const token = await requireApiToken();
    const response = await apiFetch<CartApiResponse>(
      `${CART_PATH}/${productId}`,
      {
        method: "DELETE",
        token,
      },
    );

    revalidateShop();
    return actionOk(normalizeCart(response));
  } catch (error) {
    return actionError(error);
  }
}

export async function clearCart(): Promise<ActionResult<CartSnapshot>> {
  try {
    const token = await requireApiToken();
    await apiFetch<{ message?: string }>(CART_PATH, {
      method: "DELETE",
      token,
    });

    const response = await apiFetch<CartApiResponse>(CART_PATH, {
      token,
      next: { revalidate: 0 },
    });

    revalidateShop();
    return actionOk(normalizeCart(response));
  } catch (error) {
    return actionError(error);
  }
}
