export const RESET_EMAIL_KEY = "freshcart:reset-email";
export const RESET_VERIFIED_KEY = "freshcart:reset-verified";

export function rememberResetEmail(email: string): void {
  try {
    sessionStorage.setItem(RESET_EMAIL_KEY, email);
  } catch {
    // Storage can be unavailable in private browsing modes.
  }
}

export function rememberedResetEmail(): string | null {
  try {
    return sessionStorage.getItem(RESET_EMAIL_KEY);
  } catch {
    return null;
  }
}

export function markResetVerified(): void {
  try {
    sessionStorage.setItem(RESET_VERIFIED_KEY, "true");
  } catch {
    // Storage can be unavailable in private browsing modes.
  }
}

export function isResetVerified(): boolean {
  try {
    return sessionStorage.getItem(RESET_VERIFIED_KEY) === "true";
  } catch {
    return false;
  }
}

export function clearResetFlow(): void {
  try {
    sessionStorage.removeItem(RESET_EMAIL_KEY);
    sessionStorage.removeItem(RESET_VERIFIED_KEY);
  } catch {
    // Storage can be unavailable in private browsing modes.
  }
}
