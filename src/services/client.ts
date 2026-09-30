const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000").replace(/\/$/, "");
const USE_MOCKS = (import.meta.env.VITE_USE_MOCKS ?? "true").toLowerCase() === "true";

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init.headers
    }
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new ApiError(body || `Request failed (${response.status})`, response.status);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

/**
 * The single frontend HTTP boundary. Feature services use this module.
 * In mock mode, feature services return local sample data and don't call these methods.
 */
export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) => request<T>(path, {
    method: "POST",
    body: JSON.stringify(body ?? {})
  }),
  patch: <T>(path: string, body?: unknown) => request<T>(path, {
    method: "PATCH",
    body: JSON.stringify(body ?? {})
  }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
  get baseUrl() { return BASE_URL; },
  get useMocks() { return USE_MOCKS; }
};
