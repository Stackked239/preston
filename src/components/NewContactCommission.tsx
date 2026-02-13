"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/lib/theme";
import { fetchCommissions } from "@/lib/phorestApi";
import type { CommissionResult } from "@/types/phorest";

export default function NewContactCommission() {
  const { theme, toggleTheme } = useTheme();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [results, setResults] = useState<CommissionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (forceRefresh = false) => {
    if (!startDate || !endDate) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCommissions(startDate, endDate, forceRefresh);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-10 py-6 border-b"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-sans no-underline transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            &larr; Back
          </Link>
          <div>
            <h1
              className="text-[22px] font-light tracking-[3px] uppercase m-0"
              style={{ color: "var(--gold)" }}
            >
              New Contact Commission
            </h1>
            <p
              className="text-[10px] font-sans tracking-[2px] uppercase mt-1"
              style={{ color: "var(--text-muted)" }}
            >
              First-visit commission calculator
            </p>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="border px-3 py-1.5 rounded-md text-xs font-sans tracking-[1px] uppercase transition-all"
          style={{ borderColor: "var(--border-color)", color: "var(--gold)" }}
        >
          {theme === "dark" ? "\u2600 Light" : "\u25CF Dark"}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-10 py-8 font-sans">
        {/* Date Range Form */}
        <div
          className="rounded-xl border p-6 mb-8"
          style={{
            background: "var(--bg-secondary)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label
                className="block text-xs uppercase tracking-[1px] mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded-lg border px-4 py-2 text-sm outline-none"
                style={{
                  background: "var(--input-bg)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <div>
              <label
                className="block text-xs uppercase tracking-[1px] mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="rounded-lg border px-4 py-2 text-sm outline-none"
                style={{
                  background: "var(--input-bg)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <button
              onClick={() => handleCalculate(false)}
              disabled={loading || !startDate || !endDate}
              className="rounded-lg px-6 py-2 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: "var(--gold)", color: "#0a0b0e" }}
            >
              {loading ? "Calculating..." : "Calculate"}
            </button>
            {results && (
              <button
                onClick={() => handleCalculate(true)}
                disabled={loading}
                className="rounded-lg border px-4 py-2 text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--text-secondary)",
                }}
              >
                Refresh
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div
              className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mb-4"
              style={{ borderColor: "var(--gold)", borderTopColor: "transparent" }}
            />
            <p
              className="text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Fetching appointments from Phorest...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div
            className="rounded-xl border p-6 text-center"
            style={{
              borderColor: "#ef4444",
              background: "rgba(239, 68, 68, 0.05)",
            }}
          >
            <p className="text-sm mb-3" style={{ color: "#ef4444" }}>
              {error}
            </p>
            <button
              onClick={() => handleCalculate(true)}
              className="rounded-lg px-4 py-2 text-sm font-medium"
              style={{ background: "#ef4444", color: "#fff" }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Results */}
        {results && !loading && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                {
                  label: "Total Commission",
                  value: `$${results.totalCommission.toFixed(2)}`,
                },
                {
                  label: "New Clients",
                  value: results.totalNewClients.toString(),
                },
                {
                  label: "Branches",
                  value: results.branches.length.toString(),
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-xl border p-5"
                  style={{
                    background: "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <p
                    className="text-[10px] uppercase tracking-[1px] mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {card.label}
                  </p>
                  <p
                    className="text-2xl font-light"
                    style={{ color: "var(--gold)" }}
                  >
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            {/* No results message */}
            {results.branches.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  No first-time client appointments found in this date range.
                </p>
              </div>
            )}

            {/* Per-Branch Results */}
            {results.branches.map((branch) => (
              <div
                key={branch.branchId}
                className="rounded-xl border mb-6 overflow-hidden"
                style={{
                  background: "var(--bg-secondary)",
                  borderColor: "var(--border-color)",
                }}
              >
                {/* Branch Header */}
                <div
                  className="flex items-center justify-between px-6 py-4 border-b"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <h2
                    className="text-base font-medium tracking-wide"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {branch.branchName}
                  </h2>
                  <span
                    className="text-lg font-light"
                    style={{ color: "var(--gold)" }}
                  >
                    ${branch.branchTotal.toFixed(2)}
                  </span>
                </div>

                {/* Per-Stylist Sections */}
                {branch.stylists.map((stylist) => (
                  <div key={stylist.staffId}>
                    {/* Stylist Header */}
                    <div
                      className="flex items-center justify-between px-6 py-3 border-b"
                      style={{
                        borderColor: "var(--border-light)",
                        background: "var(--card-bg)",
                      }}
                    >
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {stylist.staffName}
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: "var(--gold)" }}
                      >
                        ${stylist.stylistTotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Client Rows */}
                    {stylist.clients.map((client) =>
                      client.services.map((service) => (
                        <div
                          key={service.appointmentId}
                          className="flex items-center justify-between px-6 py-2.5 border-b text-sm"
                          style={{ borderColor: "var(--border-light)" }}
                        >
                          <div className="flex items-center gap-6 flex-1">
                            <span
                              className="w-40 truncate"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {client.clientName}
                            </span>
                            <span
                              className="w-28"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {service.appointmentDate}
                            </span>
                            <span
                              className="flex-1 truncate"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {service.serviceName}
                            </span>
                          </div>
                          <div className="flex items-center gap-6">
                            <span
                              className="w-20 text-right"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              ${service.price.toFixed(2)}
                            </span>
                            <span
                              className="w-20 text-right font-medium"
                              style={{ color: "var(--gold)" }}
                            >
                              ${service.commission.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* Fetched timestamp */}
            <p
              className="text-[10px] text-right mt-2"
              style={{ color: "var(--text-muted)" }}
            >
              Data fetched: {new Date(results.fetchedAt).toLocaleString()}
            </p>
          </>
        )}
      </main>
    </div>
  );
}
