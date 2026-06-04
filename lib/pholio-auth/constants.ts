export const PHOLIO_AUTH_CHANNEL = "pholio-auth";
export const PUBLIC_SESSION_PATH = "/api/public/session";

export function dashboardPathForRole(role?: string) {
  if (role === "AGENCY") return "/dashboard/agency";
  if (role === "TALENT") return "/dashboard/talent";
  return "/dashboard/talent";
}
