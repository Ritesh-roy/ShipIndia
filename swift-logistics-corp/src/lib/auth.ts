import type { AppRole, AccountType } from "./types";

export type { AccountType };

export function roleHomePath(role: AppRole | null): string {
  switch (role) {
    case "admin":
      return "/app/admin";
    case "driver":
      return "/app/driver";
    case "customer":
      return "/app/customer";
    default:
      return "/auth";
  }
}
