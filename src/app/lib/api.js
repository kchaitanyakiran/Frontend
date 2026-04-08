const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
const STORAGE_KEY = "agrilink_session";

export function getSession() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function saveSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getToken() {
  return getSession()?.token ?? null;
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();

  if (auth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "string"
        ? payload
        : payload?.message || "Something went wrong.";
    throw new Error(message);
  }

  return payload;
}

export const api = {
  login: (body) => request("/auth/login", { method: "POST", body }),
  register: (body) => request("/auth/register", { method: "POST", body }),
  me: () => request("/auth/me", { auth: true }),
  updateProfile: (body) => request("/auth/profile", { method: "PUT", body, auth: true }),
  submitContact: (body) => request("/contact", { method: "POST", body }),
  getFarmerDashboard: () => request("/farmer/dashboard", { auth: true }),
  getFarmerOpportunities: (search = "") =>
    request(`/farmer/opportunities${search ? `?search=${encodeURIComponent(search)}` : ""}`, { auth: true }),
  getFarmerConnections: (search = "", category = "") => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    const query = params.toString();
    return request(`/farmer/connections${query ? `?${query}` : ""}`, { auth: true });
  },
  getFarmerInitiatives: (search = "") =>
    request(`/farmer/initiatives${search ? `?search=${encodeURIComponent(search)}` : ""}`, { auth: true }),
  getFarmerResources: (search = "") =>
    request(`/farmer/resources${search ? `?search=${encodeURIComponent(search)}` : ""}`, { auth: true }),
  getAdminOverview: () => request("/admin/overview", { auth: true }),
  getAdminUsers: (role = "") =>
    request(`/admin/users${role ? `?role=${encodeURIComponent(role)}` : ""}`, { auth: true }),
  createAdminUser: (body) => request("/admin/users", { method: "POST", body, auth: true }),
  updateAdminUser: (id, body) => request(`/admin/users/${id}`, { method: "PUT", body, auth: true }),
  deleteAdminUser: (id) => request(`/admin/users/${id}`, { method: "DELETE", auth: true }),
  getAdminContent: (status = "") =>
    request(`/admin/content${status ? `?status=${encodeURIComponent(status)}` : ""}`, { auth: true }),
  getAdminContentDetail: (id) => request(`/admin/content/${id}`, { auth: true }),
  createAdminContent: (body) => request("/admin/content", { method: "POST", body, auth: true }),
  updateAdminContent: (id, body) => request(`/admin/content/${id}`, { method: "PUT", body, auth: true }),
  deleteAdminContent: (id) => request(`/admin/content/${id}`, { method: "DELETE", auth: true }),
  getAdminReports: () => request("/admin/reports", { auth: true }),
  getAdminReportPreview: (key) =>
    request(`/admin/reports/preview?key=${encodeURIComponent(key)}`, { auth: true }),
  downloadAdminReport: async (key) => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/admin/reports/export?key=${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Unable to download report.");
    return response.text();
  },
  getAdminModeration: (filter = "") =>
    request(`/admin/moderation${filter ? `?filter=${encodeURIComponent(filter)}` : ""}`, { auth: true }),
  createAdminDiscussion: (body) => request("/admin/moderation", { method: "POST", body, auth: true }),
  getAdminDiscussionDetail: (id) => request(`/admin/moderation/${id}`, { auth: true }),
  updateAdminDiscussion: (id, body) => request(`/admin/moderation/${id}`, { method: "PUT", body, auth: true }),
  deleteAdminDiscussion: (id) => request(`/admin/moderation/${id}`, { method: "DELETE", auth: true }),
  getAdminProfile: () => request("/admin/profile", { auth: true }),
  getExpertDashboard: () => request("/expert/dashboard", { auth: true }),
  getExpertContent: () => request("/expert/content", { auth: true }),
  getExpertGuidance: () => request("/expert/guidance", { auth: true }),
  getExpertQueries: () => request("/expert/queries", { auth: true }),
  getExpertSessions: () => request("/expert/sessions", { auth: true }),
  createExpertContent: (body) => request("/expert/content", { method: "POST", body, auth: true }),
  createExpertSession: (body) => request("/expert/sessions", { method: "POST", body, auth: true }),
  answerExpertQuery: (id, body) => request(`/expert/queries/${id}/answer`, { method: "PUT", body, auth: true }),
  getPublicExplore: () => request("/public/explore"),
  getPublicImpact: () => request("/public/impact"),
  getPublicLearn: () => request("/public/learn"),
  getPublicDiscussions: () => request("/public/discussions"),
  createPublicDiscussion: (body) => request("/public/discussions", { method: "POST", body }),
  getPublicSupport: () => request("/public/support"),
};

export function normalizeRole(role) {
  return (role || "FARMER").toLowerCase();
}
