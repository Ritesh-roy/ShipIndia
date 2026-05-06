import type { User, Shipment, Driver, ShipmentEvent, Profile } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const TOKEN_KEY = "leo-flex-token";

const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
const clearToken = () => localStorage.removeItem(TOKEN_KEY);

const request = async <T>(path: string, options: { method?: string; body?: any; auth?: boolean } = {}) => {
  const { method = "GET", body, auth = true } = options;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((data as any).error || (data as any).message || "Request failed");
  }
  return data as T;
};

export const signup = async (payload: {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  account_type: string;
  role: string;
}) => {
  const result = await request<{ token: string; user: User }>("/api/auth/signup", {
    method: "POST",
    body: payload,
    auth: false,
  });
  setToken(result.token);
  return result;
};

export const login = async (email: string, password: string) => {
  const result = await request<{ token: string; user: User }>("/api/auth/login", {
    method: "POST",
    body: { email, password },
    auth: false,
  });
  setToken(result.token);
  return result;
};

export const getMe = async () => {
  const result = await request<{ user: User }>("/api/auth/me");
  return result.user;
};

export const logout = async () => {
  clearToken();
};

export const fetchCustomerShipments = async () => {
  const result = await request<{ shipments: Shipment[] }>("/api/customers/me/shipments");
  return result.shipments;
};

export const createShipment = async (payload: {
  package_description: string;
  package_weight_kg: number;
  pickup_address: string;
  drop_address: string;
  recipient_name: string;
  recipient_phone: string;
  price: number;
  eta_minutes: number;
}) => {
  return await request<{ id: string; tracking_id: string }>("/api/shipments", {
    method: "POST",
    body: payload,
  });
};

export const fetchShipment = async (id: string) => {
  const result = await request<{ shipment: Shipment }>(`/api/shipments/${id}`);
  return result.shipment;
};

export const fetchShipmentEvents = async (id: string) => {
  const result = await request<{ events: ShipmentEvent[] }>(`/api/shipments/${id}/events`);
  return result.events;
};

export const fetchDriverProfile = async () => {
  const result = await request<{ driver: Driver }>("/api/drivers/me");
  return result.driver;
};

export const fetchDriverShipments = async (status?: string) => {
  const url = new URL(`${API_URL}/api/drivers/me/shipments`);
  if (status) url.searchParams.set("status", status);
  const response = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to load shipments");
  return data.shipments as Shipment[];
};

export const updateShipment = async (id: string, body: any) => {
  const result = await request<{ shipment: Shipment }>(`/api/shipments/${id}`, {
    method: "PUT",
    body,
  });
  return result.shipment;
};

export const updateDriver = async (body: any) => {
  const result = await request<{ driver: Driver }>("/api/drivers/me", {
    method: "PUT",
    body,
  });
  return result.driver;
};

export const fetchDriverById = async (id: string) => {
  const result = await request<{ driver: Driver }>(`/api/drivers/${id}`);
  return result.driver;
};

export const fetchOpenShipments = async () => {
  const result = await request<{ shipments: Shipment[] }>("/api/shipments?pool=true");
  return result.shipments;
};

export const createShipmentEvent = async (shipmentId: string, body: { event_type: string; message: string }) => {
  const result = await request<{ event: ShipmentEvent }>(`/api/shipments/${shipmentId}/events`, {
    method: "POST",
    body,
  });
  return result.event;
};

export const fetchAdminOverview = async () => {
  const result = await request<{ shipments: Shipment[]; drivers: Driver[]; users: Profile[] }>("/api/admin/overview");
  return result;
};
