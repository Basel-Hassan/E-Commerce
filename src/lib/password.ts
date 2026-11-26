export type PasswordStrength = {
  label: string;
  width: string;
  color: string;
};

export function measurePasswordStrength(
  password: string,
): PasswordStrength {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  if (password.length >= 12) score += 1;

  if (!password) {
    return { label: "Weak", width: "0%", color: "bg-red-500" };
  }

  if (score <= 1) {
    return { label: "Weak", width: "25%", color: "bg-red-500" };
  }

  if (score === 2) {
    return { label: "Fair", width: "50%", color: "bg-orange-500" };
  }

  if (score === 3) {
    return { label: "Good", width: "75%", color: "bg-yellow-500" };
  }

  return { label: "Strong", width: "100%", color: "bg-primary-600" };
}
