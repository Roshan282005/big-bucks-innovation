const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const apiClient = {
  async post(path: string, body: unknown) {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // send HttpOnly cookies
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  async get(path: string) {
    const res = await fetch(`${BASE_URL}${path}`, { credentials: "include" });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
};

