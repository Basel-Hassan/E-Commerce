import "server-only";

export const API_BASE_URL = (
  process.env.API_BASE_URL ?? "https://ecommerce.routemisr.com"
).replace(/\/+$/, "");

const DEFAULT_TIMEOUT_MS = 15_000;

const UNAUTHORIZED_MESSAGE_PATTERNS = [
  /invalid\s+(?:or\s+expired\s+)?token/i,
  /token\s+(?:is\s+)?(?:invalid|expired)/i,
  /recently\s+changed\s+password/i,
  /please\s+login\s+again/i,
  /please\s+sign\s+in\s+again/i,
  /unauthorized/i,
  /not\s+(?:logged|signed)\s+in/i,
];

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type NextFetchOptions = {
  revalidate?: number | false;
  tags?: string[];
};

export type ApiRequestOptions = Omit<
  RequestInit,
  "body" | "headers" | "method"
> & {
  method?: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
  token?: string | null;
  timeoutMs?: number;
  next?: NextFetchOptions;
};

export class ApiError extends Error {
  readonly status: number;
  readonly payload: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string, payload?: unknown) {
    super(message, 401, payload);
    this.name = "UnauthorizedError";
  }
}

function isUnauthorizedMessage(message: string): boolean {
  return UNAUTHORIZED_MESSAGE_PATTERNS.some((pattern) => pattern.test(message));
}

export function isUnauthorizedError(error: unknown): error is ApiError {
  if (!(error instanceof ApiError)) return false;
  return error.status === 401 || isUnauthorizedMessage(error.message);
}

export type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | readonly (string | number)[];

export function buildQuery(params: Record<string, QueryValue>): string {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;

    if (Array.isArray(value)) {
      for (const item of value) search.append(key, String(item));
      continue;
    }

    search.append(key, String(value));
  }

  const query = search.toString();
  return query ? `?${query}` : "";
}

export function apiUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
}

function serializeBody(
  body: unknown,
  headers: Headers,
): BodyInit | undefined {
  if (body === undefined || body === null) return undefined;

  if (
    typeof body === "string" ||
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    body instanceof Blob ||
    body instanceof ArrayBuffer
  ) {
    return body;
  }

  headers.set("Content-Type", "application/json");
  return JSON.stringify(body);
}

function extractErrorMessage(payload: unknown, fallback: string): string {
  if (typeof payload === "string" && payload.trim()) return payload;

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;

    for (const key of ["message", "error", "statusMsg"]) {
      const value = record[key];
      if (typeof value === "string" && value.trim()) return value;
    }

    const errors = record.errors;
    if (errors && typeof errors === "object") {
      const first = Object.values(errors).find(
        (value) => typeof value === "string" && value.trim(),
      );
      if (typeof first === "string") return first;
    }
  }

  return fallback;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();

  let payload: unknown;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!response.ok) {
    const message = extractErrorMessage(
      payload,
      response.statusText || "Request failed",
    );

    if (response.status === 401 || isUnauthorizedMessage(message)) {
      throw new UnauthorizedError(message, payload);
    }

    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
}

export async function apiFetch<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const {
    method = "GET",
    body,
    headers,
    token,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    next,
    signal,
    ...rest
  } = options;

  const requestHeaders = new Headers(headers);
  requestHeaders.set("Accept", "application/json");

  if (token) requestHeaders.set("token", token);

  const requestBody = serializeBody(body, requestHeaders);

  const controller = new AbortController();
  const abort = () => controller.abort();

  const timeout = setTimeout(abort, timeoutMs);
  signal?.addEventListener("abort", abort, { once: true });

  try {
    const response = await fetch(apiUrl(path), {
      ...rest,
      method,
      headers: requestHeaders,
      body: requestBody,
      signal: controller.signal,
      next,
    } as RequestInit & { next?: NextFetchOptions });

    return await parseResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) throw error;

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("The request timed out. Please try again.", 0, error);
    }

    throw new ApiError(
      "Unable to reach the server. Please check your connection.",
      0,
      error,
    );
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", abort);
  }
}
