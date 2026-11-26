"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { getCart } from "@/actions/cart.actions";
import { actionError, actionOk } from "@/lib/action-result";
import { apiFetch } from "@/lib/api";
import { requireSession } from "@/lib/auth-guard";
import type { ShippingAddressInput } from "@/schemas/checkout.schema";
import type { ActionResult } from "@/types/action";
import type {
  CashOrderResponse,
  CheckoutSessionResponse,
  Order,
} from "@/types/order";

const ORDERS_PATH = "api/v1/orders";

async function requireAuth() {
  const session = await requireSession();

  return {
    token: session.apiToken as string,
    userId: session.user.id,
  };
}

async function getRequestOrigin() {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host");
  const host =
    forwardedHost?.split(",")[0]?.trim() ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto")?.split(",")[0]?.trim() ?? "http";

  if (!host) {
    return (process.env.NEXTAUTH_URL ?? "http://localhost:3000").replace(
      /\/+$/,
      "",
    );
  }

  return `${protocol}://${host}`;
}

export async function getUserOrders(): Promise<Order[]> {
  const { token, userId } = await requireAuth();
  const data = await apiFetch<Order[]>(`${ORDERS_PATH}/user/${userId}`, {
    token,
    next: { revalidate: 0 },
  });

  return Array.isArray(data) ? data : [];
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const orders = await getUserOrders();
  return orders.find((order) => order._id === orderId) ?? null;
}

export async function createCashOrder(
  input: ShippingAddressInput,
): Promise<ActionResult<{ orderId: string }>> {
  try {
    const { token } = await requireAuth();
    const cart = await getCart();

    if (!cart.id || cart.items.length === 0) {
      throw new Error("Your cart is empty. Add a product before checking out.");
    }

    const response = await apiFetch<CashOrderResponse>(
      `api/v2/orders/${cart.id}`,
      {
        method: "POST",
        token,
        timeoutMs: 30_000,
        body: {
          shippingAddress: {
            details: input.details,
            phone: input.phone,
            city: input.city,
          },
        },
      },
    );

    if (!response.data?._id) {
      throw new Error("We couldn't confirm your order. Please try again.");
    }

    revalidatePath("/", "layout");
    revalidatePath("/orders");

    return actionOk({ orderId: response.data._id });
  } catch (error) {
    return actionError(error);
  }
}

export async function createCheckoutSession(
  input: ShippingAddressInput,
): Promise<ActionResult<{ url: string }>> {
  try {
    const { token } = await requireAuth();
    const cart = await getCart();

    if (!cart.id || cart.items.length === 0) {
      throw new Error("Your cart is empty. Add a product before checking out.");
    }

    const origin = await getRequestOrigin();
    const returnUrl = `${origin}/order-success`;
    const response = await apiFetch<CheckoutSessionResponse>(
      `${ORDERS_PATH}/checkout-session/${cart.id}?url=${encodeURIComponent(
        returnUrl,
      )}`,
      {
        method: "POST",
        token,
        timeoutMs: 30_000,
        body: {
          shippingAddress: {
            details: input.details,
            phone: input.phone,
            city: input.city,
          },
        },
      },
    );

    const paymentUrl = response.session?.url;

    if (!paymentUrl) {
      throw new Error("Unable to start the payment session. Please try again.");
    }

    return actionOk({ url: paymentUrl });
  } catch (error) {
    return actionError(error);
  }
}
