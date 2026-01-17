"use client";

import { useMemo, useState } from "react";
import SortHeader from "./SortTableHeader";
import { useCampaignStore } from "@/store/useCampaignStore";
import formatCurrency from "@/lib/formatCurrency";
import StatusBadge from "./StatusBadge";
import { CampaignCategory, CampaignStatus } from "@/lib/types";
import { CATEGORIES, STATUSES } from "@/lib/mockData";

export type SortKey =
  | "name"
  | "status"
  | "category"
  | "budget"
  | "spent"
  | "revenue"
  | "roi";
export type SortDirection = "asc" | "desc";

export default function CampaignTable() {
  const { filters, setFilter, getFilteredCampaigns } = useCampaignStore();
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const SortKeys: SortKey[] = [
    "name",
    "status",
    "category",
    "budget",
    "spent",
    "revenue",
    "roi",
  ];
  const filteredCampaigns = getFilteredCampaigns();

  // Sorts the campaigns based on the current sort key and direction.
  // Memoize to avoid re-sorting on every render
  const sortedCampaigns = useMemo(() => {
    return [...filteredCampaigns].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const modifier = sortDirection === "asc" ? 1 : -1;

      if (typeof aVal === "string") {
        return aVal.localeCompare(bVal as string) * modifier;
      }
      return ((aVal as number) - (bVal as number)) * modifier;
    });
  }, [filteredCampaigns, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  return (
    <div className="live-event-feed rounded-[12px] border border-amber-900 p-6 shadow bg-white">
      <div className="flex justify-between mb-4">
        <h3 className="text-2xl font-bold">Campaign Table</h3>

        <div className="flex gap-2">
          <select
            name="status"
            value={filters.status || ""}
            onChange={(e) =>
              setFilter("status", (e.target.value as CampaignStatus) || null)
            }
            className="border rounded-lg px-3 py-2"
          >
            <option value="">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <select
            name="category"
            value={filters.category || ""}
            onChange={(e) =>
              setFilter(
                "category",
                (e.target.value as CampaignCategory) || null,
              )
            }
            className="border rounded-lg px-3 py-2"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                {SortKeys.map((key) => (
                  <SortHeader
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    sortKey={key}
                    currentSort={sortKey}
                    direction={sortDirection}
                    onSort={handleSort}
                  />
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {sortedCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {campaign.name}
                  </td>
                  <td className="px-4 py-3 text-gray-900">
                    <StatusBadge status={campaign.status} />
                  </td>
                  <td className="px-4 py-3 text-gray-900">
                    {campaign.category}
                  </td>
                  <td className="px-4 py-3 text-gray-900">
                    {formatCurrency(campaign.budget)}
                  </td>
                  <td className="px-4 py-3 text-gray-900">
                    {formatCurrency(campaign.spent)}
                  </td>
                  <td className="px-4 py-3 text-gray-900">
                    {formatCurrency(campaign.revenue)}
                  </td>
                  <td
                    className={`px-4 py-3 font-medium ${
                      campaign.roi >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {campaign.roi >= 0 ? "+" : ""}
                    {campaign.roi.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
