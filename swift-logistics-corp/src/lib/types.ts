export type AppRole = "admin" | "driver" | "customer";
export type AccountType = "person" | "store";

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  account_type: AccountType;
  role: AppRole;
  created_at: string;
  updated_at: string;
}

export type ShipmentStatus = "pending" | "assigned" | "picked_up" | "in_transit" | "delivered" | "cancelled" | "failed";

export interface Shipment {
  id: string;
  tracking_id: string;
  customer_id: string;
  driver_id?: string | null;
  status: ShipmentStatus;
  package_description: string;
  package_weight_kg: number;
  pickup_address: string;
  drop_address: string;
  recipient_name: string;
  recipient_phone: string;
  price: number;
  eta_minutes: number;
  delivered_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Driver {
  id: string;
  user_id: string;
  vehicle_type?: string;
  vehicle_number?: string;
  license_number?: string;
  availability: "online" | "offline" | "on_trip";
  total_earnings: number;
  rating: number;
  total_trips: number;
  created_at: string;
  updated_at: string;
}

export interface ShipmentEvent {
  id: string;
  shipment_id: string;
  event_type: string;
  message: string;
  created_by?: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  account_type: AccountType;
  role: AppRole;
  created_at: string;
  updated_at: string;
}
