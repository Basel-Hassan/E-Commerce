"use server";

import { revalidatePath } from "next/cache";

import { actionError, actionOk } from "@/lib/action-result";
import { apiFetch } from "@/lib/api";
import { requireApiToken } from "@/lib/auth-guard";
import { addressSchema, type AddressInput } from "@/schemas/address.schema";
import type { ActionResult } from "@/types/action";
import type { Address } from "@/types/user";

const ADDRESSES_PATH = "api/v1/addresses";

type AddressResponse = {
  data?: Address[] | Address;
};

function normalizeAddresses(value: AddressResponse["data"]): Address[] {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object" && "_id" in value) return [value];
  return [];
}

function validationError(input: AddressInput): string | null {
  const parsed = addressSchema.safeParse(input);
  if (parsed.success) return null;
  return parsed.error.issues[0]?.message ?? "Invalid address";
}

async function fetchAddresses(token: string): Promise<Address[]> {
  const response = await apiFetch<AddressResponse>(ADDRESSES_PATH, {
    token,
    cache: "no-store",
  });

  return normalizeAddresses(response.data);
}

export async function getAddresses(): Promise<Address[]> {
  const token = await requireApiToken();
  return fetchAddresses(token);
}

export async function addAddress(
  input: AddressInput,
): Promise<ActionResult<Address[]>> {
  const error = validationError(input);
  if (error) return { success: false, error };

  try {
    const token = await requireApiToken();

    await apiFetch(`${ADDRESSES_PATH}`, {
      method: "POST",
      body: input,
      token,
      cache: "no-store",
    });

    const addresses = await fetchAddresses(token);
    revalidatePath("/profile/addresses");
    return actionOk(addresses);
  } catch (error) {
    return actionError(error);
  }
}

export async function updateAddress(
  id: string,
  input: AddressInput,
): Promise<ActionResult<Address[]>> {
  const error = validationError(input);
  if (error) return { success: false, error };

  try {
    const token = await requireApiToken();

    await apiFetch(`${ADDRESSES_PATH}/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: input,
      token,
      cache: "no-store",
    });

    const addresses = await fetchAddresses(token);
    revalidatePath("/profile/addresses");
    return actionOk(addresses);
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteAddress(
  id: string,
): Promise<ActionResult<Address[]>> {
  try {
    const token = await requireApiToken();

    await apiFetch(`${ADDRESSES_PATH}/${encodeURIComponent(id)}`, {
      method: "DELETE",
      token,
      cache: "no-store",
    });

    const addresses = await fetchAddresses(token);
    revalidatePath("/profile/addresses");
    return actionOk(addresses);
  } catch (error) {
    return actionError(error);
  }
}
