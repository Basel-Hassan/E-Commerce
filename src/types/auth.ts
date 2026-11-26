export interface AuthUser {
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  message?: string;
  status?: string;
  token?: string;
  user?: AuthUser;
}

export interface MessageResponse {
  message?: string;
  status?: string;
  statusMsg?: string;
  info?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyResetCodePayload {
  resetCode: string;
}

export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
}
