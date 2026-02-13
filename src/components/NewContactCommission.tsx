"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchCommissions } from "@/lib/phorestApi";
import type { CommissionResult } from "@/types/phorest";

/* ── WH Brand Palette ── */
const brand = {
  black: "#141414",
  white: "#ffffff",
  mauve: "#b5a49d",
  grayLight: "#bdbdbd",
  grayMid: "#8e8e8e",
  grayDark: "#5e5e5e",
  earthLight: "#776e55",
  earthDark: "#363129",
  bgPage: "#faf9f7",
  bgCard: "#ffffff",
  bgCardAlt: "#f5f3ef",
  borderLight: "rgba(181, 164, 157, 0.2)",
  borderMed: "rgba(181, 164, 157, 0.35)",
};

const fontHeader = "'Palatino Linotype', 'Palatino', 'Book Antiqua', Georgia, serif";
const fontBody = "'League Spartan', 'DM Sans', system-ui, sans-serif";

export default function NewContactCommission() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [results, setResults] = useState<CommissionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(new Set());
  const [expandedStylists, setExpandedStylists] = useState<Set<string>>(new Set());

  const toggleBranch = useCallback((branchId: string) => {
    setExpandedBranches((prev) => {
      const next = new Set(prev);
      if (next.has(branchId)) next.delete(branchId);
      else next.add(branchId);
      return next;
    });
  }, []);

  const toggleStylist = useCallback((stylistKey: string) => {
    setExpandedStylists((prev) => {
      const next = new Set(prev);
      if (next.has(stylistKey)) next.delete(stylistKey);
      else next.add(stylistKey);
      return next;
    });
  }, []);

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
      style={{ background: brand.bgPage, fontFamily: fontBody }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-10 py-5 border-b"
        style={{ background: brand.white, borderColor: brand.borderLight }}
      >
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm no-underline transition-colors hover:opacity-70"
            style={{ color: brand.grayMid, fontFamily: fontBody }}
          >
            &larr; Back
          </Link>
          <div className="flex items-center gap-4">
            <Image
              src="/wh-logo-circle-bw.png"
              alt="Woodhouse"
              width={44}
              height={44}
              className="rounded-full"
            />
            <div>
              <h1
                className="text-[20px] font-normal tracking-[2px] uppercase m-0"
                style={{ color: brand.earthDark, fontFamily: fontHeader }}
              >
                New Customer Fee
              </h1>
              <p
                className="text-[10px] tracking-[2px] uppercase mt-0.5"
                style={{ color: brand.grayMid, fontFamily: fontBody }}
              >
                First-visit commission calculator
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-10 py-8">
        {/* Date Range Form */}
        <div
          className="rounded-xl border p-6 mb-8"
          style={{
            background: brand.bgCard,
            borderColor: brand.borderLight,
            boxShadow: "0 1px 3px rgba(54, 49, 41, 0.04)",
          }}
        >
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label
                className="block text-xs uppercase tracking-[1px] mb-2 font-medium"
                style={{ color: brand.grayDark, fontFamily: fontBody }}
              >
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded-lg border px-4 py-2 text-sm outline-none transition-colors focus:ring-1"
                style={{
                  background: brand.bgCardAlt,
                  borderColor: brand.borderMed,
                  color: brand.black,
                  fontFamily: fontBody,
                }}
              />
            </div>
            <div>
              <label
                className="block text-xs uppercase tracking-[1px] mb-2 font-medium"
                style={{ color: brand.grayDark, fontFamily: fontBody }}
              >
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="rounded-lg border px-4 py-2 text-sm outline-none transition-colors focus:ring-1"
                style={{
                  background: brand.bgCardAlt,
                  borderColor: brand.borderMed,
                  color: brand.black,
                  fontFamily: fontBody,
                }}
              />
            </div>
            <button
              onClick={() => handleCalculate(false)}
              disabled={loading || !startDate || !endDate}
              className="rounded-lg px-6 py-2 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: brand.mauve, color: brand.white, fontFamily: fontBody }}
            >
              {loading ? "Calculating..." : "Calculate"}
            </button>
            {results && (
              <button
                onClick={() => handleCalculate(true)}
                disabled={loading}
                className="rounded-lg border px-4 py-2 text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{
                  borderColor: brand.borderMed,
                  color: brand.grayDark,
                  fontFamily: fontBody,
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
              style={{ borderColor: brand.mauve, borderTopColor: "transparent" }}
            />
            <p className="text-sm" style={{ color: brand.grayMid }}>
              Fetching appointments from Phorest...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div
            className="rounded-xl border p-6 text-center"
            style={{
              borderColor: "#c47070",
              background: "rgba(196, 112, 112, 0.05)",
            }}
          >
            <p className="text-sm mb-3" style={{ color: "#b35555" }}>
              {error}
            </p>
            <button
              onClick={() => handleCalculate(true)}
              className="rounded-lg px-4 py-2 text-sm font-medium"
              style={{ background: "#b35555", color: brand.white }}
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
                  label: "Total Fees",
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
                    background: brand.bgCard,
                    borderColor: brand.borderLight,
                    boxShadow: "0 1px 3px rgba(54, 49, 41, 0.04)",
                  }}
                >
                  <p
                    className="text-[10px] uppercase tracking-[1.5px] mb-1 font-medium"
                    style={{ color: brand.grayMid, fontFamily: fontBody }}
                  >
                    {card.label}
                  </p>
                  <p
                    className="text-2xl font-light"
                    style={{ color: brand.earthDark, fontFamily: fontHeader }}
                  >
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            {/* No results message */}
            {results.branches.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm" style={{ color: brand.grayMid }}>
                  No first-time client appointments found in this date range.
                </p>
              </div>
            )}

            {/* Per-Branch Accordion */}
            {results.branches.map((branch) => {
              const branchOpen = expandedBranches.has(branch.branchId);
              return (
                <div
                  key={branch.branchId}
                  className="rounded-xl border mb-4 overflow-hidden"
                  style={{
                    background: brand.bgCard,
                    borderColor: brand.borderLight,
                    boxShadow: "0 1px 3px rgba(54, 49, 41, 0.04)",
                  }}
                >
                  {/* Branch Row — always visible */}
                  <button
                    onClick={() => toggleBranch(branch.branchId)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
                    style={{ background: branchOpen ? brand.bgCardAlt : brand.bgCard }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs transition-transform inline-block"
                        style={{
                          color: brand.grayMid,
                          transform: branchOpen ? "rotate(90deg)" : "rotate(0deg)",
                        }}
                      >
                        &#9656;
                      </span>
                      <h2
                        className="text-base font-medium tracking-wide m-0"
                        style={{ color: brand.earthDark, fontFamily: fontHeader }}
                      >
                        {branch.branchName}
                      </h2>
                      <span
                        className="text-xs"
                        style={{ color: brand.grayMid }}
                      >
                        {branch.stylists.length} stylist{branch.stylists.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <span
                      className="text-lg font-normal"
                      style={{ color: brand.mauve, fontFamily: fontHeader }}
                    >
                      ${branch.branchTotal.toFixed(2)}
                    </span>
                  </button>

                  {/* Stylist Accordion — visible when branch expanded */}
                  {branchOpen && branch.stylists.map((stylist) => {
                    const stylistKey = `${branch.branchId}:${stylist.staffId}`;
                    const stylistOpen = expandedStylists.has(stylistKey);
                    return (
                      <div key={stylist.staffId}>
                        {/* Stylist Row */}
                        <button
                          onClick={() => toggleStylist(stylistKey)}
                          className="w-full flex items-center justify-between pl-10 pr-6 py-3 border-t text-left transition-colors"
                          style={{
                            borderColor: brand.borderLight,
                            background: stylistOpen ? "rgba(181, 164, 157, 0.08)" : "rgba(181, 164, 157, 0.03)",
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="text-[10px] transition-transform inline-block"
                              style={{
                                color: brand.grayMid,
                                transform: stylistOpen ? "rotate(90deg)" : "rotate(0deg)",
                              }}
                            >
                              &#9656;
                            </span>
                            <span
                              className="text-sm font-medium"
                              style={{ color: brand.black }}
                            >
                              {stylist.staffName}
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: brand.grayMid }}
                            >
                              {stylist.clients.length} client{stylist.clients.length !== 1 ? "s" : ""}
                            </span>
                          </div>
                          <span
                            className="text-sm font-medium"
                            style={{ color: brand.mauve }}
                          >
                            ${stylist.stylistTotal.toFixed(2)}
                          </span>
                        </button>

                        {/* Client Rows — visible when stylist expanded */}
                        {stylistOpen && stylist.clients.map((client) => {
                          const appointmentPrice = client.services.reduce(
                            (sum, s) => sum + s.price,
                            0
                          );
                          return (
                            <div
                              key={client.clientId}
                              className="flex items-center justify-between pl-16 pr-6 py-2.5 border-t text-sm"
                              style={{ borderColor: brand.borderLight }}
                            >
                              <div className="flex items-center gap-6 flex-1">
                                <span
                                  className="w-40 truncate"
                                  style={{ color: brand.black }}
                                >
                                  {client.clientName}
                                </span>
                                <span
                                  className="w-28"
                                  style={{ color: brand.grayMid }}
                                >
                                  {client.firstVisitDate}
                                </span>
                              </div>
                              <div className="flex items-center gap-6">
                                <span
                                  className="w-20 text-right"
                                  style={{ color: brand.grayDark }}
                                >
                                  ${appointmentPrice.toFixed(2)}
                                </span>
                                <span
                                  className="w-20 text-right font-medium"
                                  style={{ color: brand.mauve }}
                                >
                                  ${client.clientTotal.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Fetched timestamp */}
            <p
              className="text-[10px] text-right mt-2"
              style={{ color: brand.grayLight }}
            >
              Data fetched: {new Date(results.fetchedAt).toLocaleString()}
            </p>
          </>
        )}
      </main>
    </div>
  );
}
