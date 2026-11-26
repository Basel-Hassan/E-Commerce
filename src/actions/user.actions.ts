"use server";

import { revalidatePath } from "next/cache";

import { actionError, actionOk } from "@/lib/action-result";
import { apiFetch } from "@/lib/api";
import { requireApiToken } from "@/lib/auth-guard";
import type { ChangePasswordInput, ProfileInput } from "@/schemas/user.schema";
import type { ActionResult } from "@/types/action";
import type { User } from "@/types/user";

const USERS_PATH = "api/v1/users";

export async function getCurrentUser(): Promise<User | null> {
  const token = await requireApiToken();
  const response = await apiFetch<{ data: User }>(`${USERS_PATH}/getMe`, {
    token,
    cache: "no-store",
  });

  return response.data ?? null;
}

export async function updateUserProfile(
  input: ProfileInput,
): Promise<
  ActionResult<{
    message?: string;
    user?: { name: string; email: string; role?: string };
  }>
> {
  try {
    const token = await requireApiToken();
    const currentUser = await getCurrentUser();
    const body: Partial<ProfileInput> = {};

    if (input.name !== currentUser?.name) body.name = input.name;
    if (input.email !== currentUser?.email) body.email = input.email;
    if (input.phone !== currentUser?.phone) body.phone = input.phone;
    if (!Object.keys(body).length) body.name = input.name;

    const data = await apiFetch<{
      message?: string;
      user?: { name: string; email: string; role?: string };
    }>(`${USERS_PATH}/updateMe/`, {
      method: "PUT",
      body,
      token,
      cache: "no-store",
    });

    revalidatePath("/profile/settings");
    revalidatePath("/", "layout");
    return actionOk(data);
  } catch {
    return { success: false, error: "Failed to update profile" };
  }
}

export async function changeUserPassword(
  input: ChangePasswordInput,
): Promise<ActionResult<{ message?: string; token?: string }>> {
  try {
    const token = await requireApiToken();
    const data = await apiFetch<{ message?: string; token?: string }>(
      `${USERS_PATH}/changeMyPassword`,
      {
        method: "PUT",
        body: {
          currentPassword: input.currentPassword,
          password: input.newPassword,
          rePassword: input.confirmPassword,
        },
        token,
        cache: "no-store",
      },
    );

    revalidatePath("/profile/settings");
    revalidatePath("/", "layout");
    return actionOk({
      message:
        data.message === "success"
          ? "Password changed successfully"
          : data.message,
      token: data.token,
    });
  } catch (error) {
    return actionError(error);
  }
}
