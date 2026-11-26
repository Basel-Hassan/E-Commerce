"use server";

import { apiFetch } from "@/lib/api";
import { actionError, actionOk } from "@/lib/action-result";
import type { ActionResult } from "@/types/action";
import type {
  AuthResponse,
  ForgotPasswordPayload,
  LoginPayload,
  MessageResponse,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyResetCodePayload,
} from "@/types/auth";

export async function loginUser(input: LoginPayload): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/api/v1/auth/signin", {
    method: "POST",
    body: input,
    cache: "no-store",
  });
}

export async function signUpAction(
  input: RegisterPayload,
): Promise<ActionResult<AuthResponse>> {
  try {
    const data = await apiFetch<AuthResponse>("/api/v1/auth/signup", {
      method: "POST",
      body: input,
      cache: "no-store",
    });

    return actionOk(data);
  } catch (error) {
    return actionError(error);
  }
}

export async function forgotPasswordAction(
  input: ForgotPasswordPayload,
): Promise<ActionResult<MessageResponse>> {
  try {
    const data = await apiFetch<MessageResponse>(
      "/api/v1/auth/forgotPasswords",
      {
        method: "POST",
        body: input,
        cache: "no-store",
      },
    );

    return actionOk(data);
  } catch (error) {
    return actionError(error);
  }
}

export async function verifyResetCodeAction(
  input: VerifyResetCodePayload,
): Promise<ActionResult<MessageResponse>> {
  try {
    const data = await apiFetch<MessageResponse>(
      "/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        body: input,
        cache: "no-store",
      },
    );

    return actionOk(data);
  } catch (error) {
    return actionError(error);
  }
}

export async function resetPasswordAction(
  input: ResetPasswordPayload,
): Promise<ActionResult<MessageResponse>> {
  try {
    const data = await apiFetch<MessageResponse>("/api/v1/auth/resetPassword", {
      method: "PUT",
      body: input,
      cache: "no-store",
    });

    return actionOk(data);
  } catch (error) {
    return actionError(error);
  }
}
