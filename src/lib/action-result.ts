import "server-only";

import { ApiError, isUnauthorizedError } from "@/lib/api";
import type { ActionResult } from "@/types/action";

export function actionOk<T>(data: T): ActionResult<T> {
  return { success: true, data };
}

export function actionError<T>(error: unknown): ActionResult<T> {
  if (isUnauthorizedError(error)) {
    return { success: false, error: "Please sign in again.", unauthorized: true };
  }

  if (error instanceof ApiError) {
    return { success: false, error: error.message };
  }

  if (error instanceof Error && error.message.trim()) {
    return { success: false, error: error.message };
  }

  return {
    success: false,
    error: "Something went wrong. Please try again.",
  };
}
