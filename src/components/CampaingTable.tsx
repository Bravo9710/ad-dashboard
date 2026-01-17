"use client";

import { useMemo, useState } from "react";
import SortHeader from "./SortTableHeader";
import { useCampaignStore } from "@/store/useCampaignStore";
import formatCurrency from "@/lib/formatCurrency";
import StatusBadge from "./StatusBadge";

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
  const { getFilteredCampaigns } = useCampaignStore();
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
