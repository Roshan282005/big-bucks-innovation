const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function request(method: string, path: string, body?: unknown) {
  const opts: RequestInit = {
    method,
    credentials: "include", // send HttpOnly cookies
    headers: { "Content-Type": "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${path}`, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const apiClient = {
  get: (path: string) => request("GET", path),
  post: (path: string, body?: unknown) => request("POST", path, body),
  put: (path: string, body?: unknown) => request("PUT", path, body),
  delete: (path: string) => request("DELETE", path),
};
