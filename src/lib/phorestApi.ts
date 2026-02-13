import type { CommissionResult } from "@/types/phorest";

export async function fetchCommissions(
  startDate: string,
  endDate: string,
  forceRefresh = false
): Promise<CommissionResult> {
  const res = await fetch("/api/phorest/commissions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ startDate, endDate, forceRefresh }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `API error: ${res.status}`);
  }

  return res.json();
}
